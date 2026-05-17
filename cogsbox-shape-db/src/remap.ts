export class RemapStore {
  private map = new Map<string, Map<unknown, unknown>>();

  set(table: string, tempId: unknown, realId: unknown): void {
    let tableMap = this.map.get(table);
    if (!tableMap) {
      tableMap = new Map();
      this.map.set(table, tableMap);
    }
    tableMap.set(tempId, realId);
  }

  toObject(): Record<string, Record<string, unknown>> {
    const obj: Record<string, Record<string, unknown>> = {};
    for (const [table, tableMap] of this.map) {
      const entries: Record<string, unknown> = {};
      for (const [temp, real] of tableMap) {
        entries[String(temp)] = real;
      }
      obj[table] = entries;
    }
    return obj;
  }
}
