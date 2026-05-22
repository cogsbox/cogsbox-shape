import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { User, UserDraft } from "../shared/schema";
import "./styles.css";

const queryClient = new QueryClient();

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  return response.json() as Promise<T>;
}

function App() {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<UserDraft | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaults = useQuery({
    queryKey: ["user-defaults"],
    queryFn: () => jsonFetch<UserDraft>("/api/defaults"),
  });

  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => jsonFetch<User[]>("/api/users"),
  });

  useEffect(() => {
    if (defaults.data && !draft) {
      setDraft({
        ...defaults.data,
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
      });
    }
  }, [defaults.data, draft]);

  const createUser = useMutation({
    mutationFn: (input: UserDraft) =>
      jsonFetch<User>("/api/users", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onMutate: async (input) => {
      setError(null);
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previous = queryClient.getQueryData<User[]>(["users"]) ?? [];
      queryClient.setQueryData<User[]>(["users"], [
        { ...(input as User), fullName: `${input.firstName} ${input.lastName}`.trim() },
        ...previous,
      ]);
      return { previous };
    },
    onError: (err, _input, context) => {
      setError(err instanceof Error ? err.message : String(err));
      if (context?.previous) queryClient.setQueryData(["users"], context.previous);
    },
    onSuccess: (created) => {
      queryClient.setQueryData<User[]>(["users"], (current = []) => [
        created,
        ...current.filter((user) => user.id !== draft?.id),
      ]);
      if (defaults.data) {
        setDraft({
          ...defaults.data,
          firstName: "",
          lastName: "",
          email: "",
        });
      }
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: Partial<UserDraft> }) =>
      jsonFetch<User>(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData<User[]>(["users"], (current = []) =>
        current.map((user) => (user.id === updated.id ? updated : user)),
      );
    },
  });

  const removeUser = useMutation({
    mutationFn: (id: number) =>
      jsonFetch<{ deleted: boolean }>(`/api/users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (_result, id) => {
      queryClient.setQueryData<User[]>(["users"], (current = []) =>
        current.filter((user) => user.id !== id),
      );
    },
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    if (draft) createUser.mutate(draft);
  }

  return (
    <main>
      <section className="toolbar">
        <div>
          <h1>cogsbox-shape playground</h1>
          <p>Schema defaults, optimistic inserts, partial updates, reconciliation, and derived DB fields.</p>
        </div>
      </section>

      <section className="grid">
        <form onSubmit={submit} className="panel">
          <h2>New user</h2>
          <label>
            First name
            <input value={draft?.firstName ?? ""} onChange={(event) => setDraft((current) => current && { ...current, firstName: event.target.value })} />
          </label>
          <label>
            Last name
            <input value={draft?.lastName ?? ""} onChange={(event) => setDraft((current) => current && { ...current, lastName: event.target.value })} />
          </label>
          <label>
            Email
            <input value={draft?.email ?? ""} onChange={(event) => setDraft((current) => current && { ...current, email: event.target.value })} />
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={draft?.isActive ?? false} onChange={(event) => setDraft((current) => current && { ...current, isActive: event.target.checked })} />
            Active
          </label>
          <button type="submit" disabled={!draft || createUser.isPending}>
            Insert
          </button>
          {error && <pre className="error">{error}</pre>}
        </form>

        <section className="panel">
          <h2>Users</h2>
          {users.isLoading && <p>Loading...</p>}
          <div className="list">
            {(users.data ?? []).map((user) => (
              <article key={String(user.id)} className="user">
                <div>
                  <strong>{user.fullName || "(no name)"}</strong>
                  <span>{user.email}</span>
                  <small>{String(user.id)} · {user.isActive ? "active" : "inactive"}</small>
                </div>
                <div className="actions">
                  <button type="button" onClick={() => updateUser.mutate({ id: Number(user.id), patch: { firstName: `${user.firstName}!` } })}>
                    Patch first
                  </button>
                  <button type="button" onClick={() => removeUser.mutate(Number(user.id))}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
