export type StorageRowId = string;

export type NewStorageObject<T> = T;

export interface ExistingStorageObject<T> {
    id: StorageRowId,
    value: T
}