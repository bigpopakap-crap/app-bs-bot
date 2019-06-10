export type StorageRowId = string;

export type UnstoredObject<T> = T;

export interface StoredObject<T> {
    id: StorageRowId,
    value: T
}