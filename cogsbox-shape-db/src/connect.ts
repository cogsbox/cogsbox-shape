import { Kysely } from "kysely";
import type { z } from "zod";
import type { TableMeta } from "./types.js";
import { TableDB } from "./table-db.js";
import type { TableDBApi } from "./table-db.js";

type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;
type Return<T> = T extends (...args: any[]) => infer R ? R : never;
type Row<T> = T extends readonly (infer TItem)[] ? TItem : T;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type SchemaMetaKey =
  | "_tableName"
  | "__primaryKeySQL"
  | "__derives"
  | "__refinements"
  | "primaryKeySQL"
  | "derive"
  | "refine";

type SqlConfigOf<TField> = TField extends { config: { sql: infer TSql } }
  ? TSql
  : TField extends { __meta: { _fieldType: infer TInner } }
    ? SqlConfigOf<TInner>
    : never;

type SqlConfigBaseValue<TSql> = TSql extends { type: "int" | "boolean" }
  ? number
  : TSql extends { type: "date" | "datetime" | "timestamp" }
    ? Date
    : TSql extends { type: "varchar" | "char" | "text" | "longtext" | "enum" }
      ? string
      : unknown;

type SqlOnlyValue<TField> = SqlConfigOf<TField> extends infer TSql
  ? TSql extends { nullable: true }
    ? SqlConfigBaseValue<TSql> | null
    : SqlConfigBaseValue<TSql>
  : unknown;

type IsSqlOnlyField<TField> = SqlConfigOf<TField> extends infer TSql
  ? TSql extends { sqlOnly: true }
    ? true
    : false
  : false;

type IsOptionalSqlOnly<TField> = TField extends {
  config: { sql: { nullable: true } };
}
  ? true
  : TField extends { config: { sql: { default: any } } }
    ? true
    : TField extends { config: { sql: { defaultValue: any } } }
      ? true
      : false;

type IsDerivedDbField<TTable, TKey> = TTable extends {
  rawSchema: { __derives?: { forDb?: infer TForDb } };
}
  ? TKey extends keyof NonNullable<TForDb>
    ? true
    : false
  : false;

type SqlOnlyInput<T> = T extends { definition: infer TDefinition }
  ? Prettify<
      {
        [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true
          ? K extends SchemaMetaKey
            ? never
            : TDefinition[K] extends { __type: "reference" }
              ? never
              : IsDerivedDbField<T, K> extends true
                ? never
              : IsOptionalSqlOnly<TDefinition[K]> extends true
                ? never
                : K
          : never]: SqlOnlyValue<TDefinition[K]>;
      } & {
        [K in keyof TDefinition as IsSqlOnlyField<TDefinition[K]> extends true
          ? K extends SchemaMetaKey
            ? never
            : TDefinition[K] extends { __type: "reference" }
              ? never
              : IsOptionalSqlOnly<TDefinition[K]> extends true
                ? K
                : never
          : never]?: SqlOnlyValue<TDefinition[K]>;
      }
    >
  : Record<string, never>;

type DbApiFor<T> = T extends {
  transforms: {
    parseForDb: (...args: any[]) => any;
    parseFromDb: (...args: any[]) => any;
  };
}
  ? TableDBApi<
      Row<Return<T["transforms"]["parseFromDb"]>>,
      Row<FirstArg<T["transforms"]["parseForDb"]>>,
      SqlOnlyInput<T>
    >
  : never;

type ConnectedView<T> = T extends {
  transforms: {
    parseForDb: (...args: any[]) => any;
    parseFromDb: (...args: any[]) => any;
  };
}
  ? Omit<T, keyof DbApiFor<T>> & DbApiFor<T>
  : T;

type ConnectedCreateView<T> = T extends {
  createView: (...args: infer TArgs) => infer TView;
}
  ? { createView: (...args: TArgs) => ConnectedView<TView> }
  : {};

type ConnectedTable<T> = T extends {
  transforms: {
    parseForDb: (...args: any[]) => any;
    parseFromDb: (...args: any[]) => any;
  };
}
  ? Omit<T, "createView" | keyof DbApiFor<T>> &
      DbApiFor<T> &
      ConnectedCreateView<T>
  : T;

type ConnectedBox<T extends Record<string, unknown>> = {
  [K in keyof T]: ConnectedTable<T[K]>;
} & {
  transaction: <R>(fn: (txBox: ConnectedBox<T>) => Promise<R>) => Promise<R>;
};

function extractTableMeta(entry: Record<string, unknown>): TableMeta {
  const definition = entry.definition as Record<string, unknown> | undefined;
  const tableName = (definition?._tableName as string) ?? "unknown";

  const dbFields = new Map<string, { dbName: string; toDb?: (val: any) => any; toClient?: (val: any) => any }>();
  const clientToDbName = new Map<string, string>();
  const pkFields: string[] = [];
  const clientPkFields: string[] = [];
  const sqlOnlyFields = new Set<string>();
  const sqlOnlyClientFields = new Set<string>();
  const sqlOnlyRequiredClientFields = new Set<string>();
  const sqlOnlyValidators = new Map<string, (val: unknown) => unknown>();
  const deriveDependencies = new Map<string, string[]>(
    Object.entries(
      ((entry as any).deriveDependencies ?? {}) as Record<string, string[]>,
    ),
  );

  if (!definition) {
    return {
      tableName,
      dbFields,
      clientToDbName,
      pkFields,
      clientPkFields,
      sqlOnlyFields,
      sqlOnlyClientFields,
      sqlOnlyRequiredClientFields,
      sqlOnlyValidators,
      deriveDependencies,
    };
  }

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
    if ((sqlConfig as any).isClientPk && !sqlConfig.isForeignKey) {
      clientPkFields.push(key);
    }
    if (sqlConfig.sqlOnly) {
      sqlOnlyFields.add(dbName);
      sqlOnlyClientFields.add(key);
      if (
        !sqlConfig.nullable &&
        !Object.prototype.hasOwnProperty.call(sqlConfig, "default") &&
        !Object.prototype.hasOwnProperty.call(sqlConfig, "defaultValue")
      ) {
        sqlOnlyRequiredClientFields.add(key);
      }

      const zodSqlSchema = config.zodSqlSchema as
        | { parse?: (val: unknown) => unknown }
        | undefined;
      if (zodSqlSchema?.parse) {
        sqlOnlyValidators.set(key, (val: unknown) => zodSqlSchema.parse!(val));
      }
    }
  }

  return {
    tableName,
    dbFields,
    clientToDbName,
    pkFields,
    clientPkFields,
    sqlOnlyFields,
    sqlOnlyClientFields,
    sqlOnlyRequiredClientFields,
    sqlOnlyValidators,
    deriveDependencies,
  };
}

function enhanceTable<T extends Record<string, unknown>>(
  entry: T,
  meta: TableMeta,
  db: Kysely<any>,
): Omit<T, keyof TableDB<any, any>> & TableDB<any, any> {
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
      if (prop in tableDb) {
        const value = Reflect.get(tableDb, prop, tableDb);
        return typeof value === "function" ? value.bind(tableDb) : value;
      }
      return Reflect.get(target, prop, receiver);
    },
  }) as any;
}

function registryKeyForTableName(
  registry: Record<string, any>,
  tableName: string,
): string | undefined {
  return Object.keys(registry).find(
    (key) => registry[key]?.rawSchema?._tableName === tableName,
  );
}

function dbNameForClientKey(meta: TableMeta, clientKey: string): string {
  return meta.clientToDbName.get(clientKey) ?? clientKey;
}

function clientKeyForRelationTarget(
  targetField: any,
  targetDefinition: Record<string, unknown>,
): string | undefined {
  const metaKey = targetField?.__meta?._key;
  if (typeof metaKey === "string") return metaKey;

  for (const [key, field] of Object.entries(targetDefinition)) {
    if (field === targetField) return key;
  }

  return undefined;
}

function createViewHydrator(
  db: Kysely<any>,
  registry: Record<string, any>,
  baseRegistryKey: string,
  selection: Record<string, any> | boolean,
): (row: Record<string, unknown>) => Promise<Record<string, unknown>> {
  const metas = new Map<string, TableMeta>();
  const getMeta = (registryKey: string) => {
    let meta = metas.get(registryKey);
    if (!meta) {
      const entry = registry[registryKey];
      meta = extractTableMeta({
        definition: entry?.rawSchema,
        deriveDependencies: entry?.deriveDependencies,
      });
      metas.set(registryKey, meta);
    }
    return meta;
  };

  const hydrate = async (
    row: Record<string, unknown>,
    currentRegistryKey: string,
    currentSelection: Record<string, any> | boolean,
  ): Promise<Record<string, unknown>> => {
    if (!row || typeof currentSelection !== "object") return row;

    const currentEntry = registry[currentRegistryKey];
    if (!currentEntry) return row;

    const currentMeta = getMeta(currentRegistryKey);
    const hydrated = { ...row };

    for (const [relationKey, relationSelection] of Object.entries(
      currentSelection,
    )) {
      if (!relationSelection) continue;

      const relationField = currentEntry.rawSchema?.[relationKey];
      const relationConfig = relationField?.config?.sql;
      if (!relationConfig?.schema) continue;

      const targetTableName = relationConfig.schema()._tableName;
      const targetRegistryKey = registryKeyForTableName(
        registry,
        targetTableName,
      );
      if (!targetRegistryKey) continue;

      const targetEntry = registry[targetRegistryKey];
      const targetMeta = getMeta(targetRegistryKey);
      const fromDbName = dbNameForClientKey(currentMeta, relationConfig.fromKey);
      const targetClientKey = clientKeyForRelationTarget(
        relationConfig.toKey?.(),
        targetEntry.rawSchema,
      );
      if (!targetClientKey) continue;

      const targetDbName = dbNameForClientKey(targetMeta, targetClientKey);
      const fromValue = row[fromDbName];
      if (fromValue === undefined || fromValue === null) {
        hydrated[relationKey] = ["hasMany", "manyToMany"].includes(
          relationConfig.type,
        )
          ? []
          : null;
        continue;
      }

      const qb = db as any;
      const relatedRows = (await qb
        .selectFrom(targetMeta.tableName)
        .selectAll()
        .where(targetDbName, "=", fromValue)
        .execute()) as Record<string, unknown>[];

      const hydratedRelated = await Promise.all(
        relatedRows.map((relatedRow) =>
          hydrate(relatedRow, targetRegistryKey, relationSelection as any),
        ),
      );

      hydrated[relationKey] = ["hasMany", "manyToMany"].includes(
        relationConfig.type,
      )
        ? hydratedRelated
        : hydratedRelated[0] ?? null;
    }

    return hydrated;
  };

  return (row) => hydrate(row, baseRegistryKey, selection);
}

export function connect<T extends Record<string, unknown>>(
  box: T,
  db: Kysely<any>,
): ConnectedBox<T> {
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
          const registry = (view as any).__registry as
            | Record<string, any>
            | undefined;
          const baseTable = (view as any).baseTable as string | undefined;
          const viewSelection = (view as any).viewSelection as
            | Record<string, any>
            | boolean
            | undefined;
          const hydrateRow =
            registry && baseTable && viewSelection
              ? createViewHydrator(db, registry, baseTable, viewSelection)
              : undefined;
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
            hydrateRow,
          );

          return new Proxy(view, {
            get(target, prop, receiver) {
              if (prop in viewDb) {
                const value = Reflect.get(viewDb, prop, viewDb);
                return typeof value === "function" ? value.bind(viewDb) : value;
              }
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
      const txBox = connect(box, trx);
      return fn(txBox);
    });
  };

  (result as any).transaction = transaction;

  return result as ConnectedBox<T>;
}
