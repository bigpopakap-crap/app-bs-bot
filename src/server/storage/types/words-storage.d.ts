import {StoredObject, UnstoredObject, StorageRowId} from "../../../shared/types/storage";
import {Optional} from "../../../shared/utils/optional";
import {WordClass} from "../../../shared/types/words";
import {WordQuery, WordMetadata} from "../../../shared/types/word-metadata";

export interface WordsStorage<T extends WordClass> {
    get: (id: StorageRowId) => Optional<StoredObject<WordMetadata<T>>>,
    getAll: (ids: Array<StorageRowId>) => Array<Optional<StoredObject<WordMetadata<T>>>>,

    update: (updatedObject: StoredObject<WordMetadata<T>>) => void,
    updateAll: (updatedObjects: Array<StoredObject<WordMetadata<T>>>) => void,

    insert: (newObject: UnstoredObject<WordMetadata<T>>) => StoredObject<WordMetadata<T>>,
    insertAll: (newObjects: Array<UnstoredObject<WordMetadata<T>>>) => Array<StoredObject<WordMetadata<T>>>,

    delete: (id: StorageRowId) => void,
    deleteAll: (ids: Array<StorageRowId>) => void,

    // TODO that would be cool if we could make the return type match the wordClass query param, if provided
    search: (query: WordQuery) => Array<StoredObject<WordMetadata<T>>>,
    random: (query: WordQuery) => Optional<StoredObject<WordMetadata<T>>>,
    randomAll: (queries: Array<WordQuery>) => Array<Optional<StoredObject<WordMetadata<T>>>>
}
