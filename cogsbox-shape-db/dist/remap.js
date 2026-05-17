export class RemapStore {
    map = new Map();
    set(table, tempId, realId) {
        let tableMap = this.map.get(table);
        if (!tableMap) {
            tableMap = new Map();
            this.map.set(table, tableMap);
        }
        tableMap.set(tempId, realId);
    }
    toObject() {
        const obj = {};
        for (const [table, tableMap] of this.map) {
            const entries = {};
            for (const [temp, real] of tableMap) {
                entries[String(temp)] = real;
            }
            obj[table] = entries;
        }
        return obj;
    }
}
