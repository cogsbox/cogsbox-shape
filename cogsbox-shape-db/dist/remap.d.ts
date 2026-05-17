export declare class RemapStore {
    private map;
    set(table: string, tempId: unknown, realId: unknown): void;
    toObject(): Record<string, Record<string, unknown>>;
}
