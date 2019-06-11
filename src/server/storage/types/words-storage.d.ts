import { StoredObject, UnstoredObject, StorageRowId } from '../../../shared/types/storage';
import { Optional } from '../../../shared/utils/optional';
import { WordClass } from '../../../shared/types/words';
import { WordQuery, WordMetadata } from '../../../shared/types/word-metadata';

export interface WordsStorage<T extends WordClass> {
  get: (id: StorageRowId) => Optional<StoredObject<WordMetadata<T>>>;
  getAll: (ids: StorageRowId[]) => Optional<StoredObject<WordMetadata<T>>>[];

  update: (updatedObject: StoredObject<WordMetadata<T>>) => void;
  updateAll: (updatedObjects: StoredObject<WordMetadata<T>>[]) => void;

  insert: (newObject: UnstoredObject<WordMetadata<T>>) => StoredObject<WordMetadata<T>>;
  insertAll: (newObjects: UnstoredObject<WordMetadata<T>>[]) => StoredObject<WordMetadata<T>>[];

  delete: (id: StorageRowId) => void;
  deleteAll: (ids: StorageRowId[]) => void;

  // TODO that would be cool if we could make the return type match the wordClass query param, if provided
  search: (query: WordQuery) => StoredObject<WordMetadata<T>>[];
  random: (query: WordQuery) => Optional<StoredObject<WordMetadata<T>>>;
  randomAll: (queries: WordQuery[]) => Optional<StoredObject<WordMetadata<T>>>[];
}
