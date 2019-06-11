import { StoredObject, UnstoredObject, StorageRowId } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';

export interface CrudableStorage<T> {
  get: (id: StorageRowId) => Optional<StoredObject<T>>;
  getAll: (ids: StorageRowId[]) => Optional<StoredObject<T>>[];

  update: (updatedObject: StoredObject<T>) => void;
  updateAll: (updatedObjects: StoredObject<T>[]) => void;

  insert: (newObject: UnstoredObject<T>) => StoredObject<T>;
  insertAll: (newObjects: UnstoredObject<T>[]) => StoredObject<T>[];

  delete: (id: StorageRowId) => void;
  deleteAll: (ids: StorageRowId[]) => void;
}

export interface SearchableStorage<T, Q> {
  search: (query: Q) => StoredObject<T>[];
  random: (query: Q) => Optional<StoredObject<T>>;
  randomAll: (queries: Q[]) => Optional<StoredObject<T>>[];
}
