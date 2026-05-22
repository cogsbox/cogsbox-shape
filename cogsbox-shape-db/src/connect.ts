import { Kysely } from "kysely";
import type { TableMeta } from "./types.js";
import { TableDB } from "./table-db.js";

function extractTableMeta(entry: Record<string, unknown>): TableMeta {
  const definition = entry.definition as Record<string, unknown> | undefined;
  const tableName = (definition?._tableName as string) ?? "unknown";

  const dbFields = new Map<string, { dbName: string; toDb?: (val: any) => any; toClient?: (val: any) => any }>();
  const clientToDbName = new Map<string, string>();
  const pkFields: string[] = [];
  const clientPkFields: string[] = [];
  const sqlOnlyFields = new Set<string>();
  const deriveDependencies = new Map<string, string[]>(
    Object.entries(
      ((entry as any).deriveDependencies ?? {}) as Record<string, string[]>,
    ),
  );

  if (!definition) return { tableName, dbFields, clientToDbName, pkFields, clientPkFields, sqlOnlyFields, deriveDependencies };

  for (const [key, field] of Object.entries(definition)) {
    if (key === "_tableName" || key.startsWith("__")) continue;
    if (typeof field !== "object" || field === null) continue;

    const config = (field as Record<string, unknown>).config as Record<string, unknown> | undefined;
    if (!config) continue;

    const sqlConfig = config.sql as Record<string, unknown> | undefined;
    if (!sqlConfig) continue;

    const type = sqlConfig.type as string | undefined;
    if (type && ["hasMany", "hasOne", "belongsTo", "manyToMany"].includes(type)) continue;

    const dbName = (sqlConfig.field as string) ?? key;
    const transforms = config.transforms as { toDb?: (val: any) => any; toClient?: (val: any) => any } | undefined;

    dbFields.set(key, {
      dbName,
      toDb: transforms?.toDb,
      toClient: transforms?.toClient,
    });
    clientToDbName.set(key, dbName);

    if (sqlConfig.pk) pkFields.push(dbName);
    if ((sqlConfig as any).isClientPk) clientPkFields.push(key);
    if (sqlConfig.sqlOnly) sqlOnlyFields.add(dbName);
  }

  return { tableName, dbFields, clientToDbName, pkFields, clientPkFields, sqlOnlyFields, deriveDependencies };
}

function enhanceTable<T extends Record<string, unknown>>(
  entry: T,
  meta: TableMeta,
  db: Kysely<unknown>,
): T & { db: TableDB<any, any> } {
  const transforms = (entry as any).transforms ?? {};
  const tableDb = new TableDB(
    db,
    meta,
    {
      toClient: transforms.toClient ?? ((r: any) => r),
      toDb: transforms.toDb ?? ((r: any) => r),
      parseForDb: transforms.parseForDb ?? ((r: any) => r),
      parsePatchForDb: transforms.parsePatchForDb ?? transforms.toDb ?? ((r: any) => r),
      parseFromDb: transforms.parseFromDb ?? ((r: any) => r),
    },
  );

  return new Proxy(entry, {
    get(target, prop, receiver) {
      if (prop === "db") return tableDb;
      return Reflect.get(target, prop, receiver);
    },
  }) as any;
}

export function connect<T extends Record<string, unknown>>(
  box: T,
  db: Kysely<unknown>,
): T & { db: { transaction: <R>(fn: (txBox: T & { db: { transaction: any } }) => Promise<R>) => Promise<R> } } {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(box)) {
    const entry = box[key] as Record<string, unknown>;
    if (typeof entry !== "object" || entry === null) {
      result[key] = entry;
      continue;
    }

    if ("definition" in entry && "schemas" in entry && "transforms" in entry) {
      const meta = extractTableMeta(entry);
      result[key] = enhanceTable(entry, meta, db);

      const originalCreateView = (entry as any).createView as ((sel: any) => any) | undefined;
      if (originalCreateView) {
        (result[key] as any).createView = (selection: any) => {
          const view = originalCreateView(selection);
          const viewMeta: TableMeta = { ...meta };

          const viewTransforms = (view as any).transforms ?? {};
          const reconcile = (view as any).reconcile as
            | ((clientData: unknown) => { withServer: (serverData: unknown) => unknown })
            | undefined;
          const viewDb = new TableDB(
            db,
            viewMeta,
            {
              toClient: viewTransforms.toClient ?? ((r: any) => r),
              toDb: viewTransforms.toDb ?? ((r: any) => r),
              parseForDb: viewTransforms.parseForDb ?? ((r: any) => r),
              parsePatchForDb: viewTransforms.parsePatchForDb ?? viewTransforms.toDb ?? ((r: any) => r),
              parseFromDb: viewTransforms.parseFromDb ?? ((r: any) => r),
            },
            reconcile,
          );

          return new Proxy(view, {
            get(target, prop, receiver) {
              if (prop === "db") return viewDb;
              return Reflect.get(target, prop, receiver);
            },
          });
        };
      }
    } else {
      result[key] = entry;
    }
  }

  const transaction = async <R>(
    fn: (txBox: any) => Promise<R>,
  ): Promise<R> => {
    return db.transaction().execute(async (trx) => {
      const txBox = connect(box, trx as Kysely<unknown>);
      return fn(txBox);
    });
  };

  (result as any).db = { transaction };

  return result as any;
}
