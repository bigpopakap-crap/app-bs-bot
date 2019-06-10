import {ExistingStorageObject, NewStorageObject, StorageRowId} from "../../../shared/types/storage";
import {Optional} from "../../../shared/utils/optional";
import {Word, WordClass} from "../../../shared/types/words";

type PageStart = string;
type PageEnd = string;
type WordTag = string;

export interface PagingQuery {
    start?: PageStart,
    end?: PageEnd,
}

export interface SearchQuery {
    searchText?: string,
    wordClass?: WordClass,
    tags?: Array<WordTag>,
    noNSFW?: boolean,
}

export interface WordMetadata<T extends WordClass> {
    forms: Array<string>,
    tags: Array<WordTag>,
    isNSFW: boolean,
    value: Word<T>
}

export interface WordsStorage<T extends WordClass> {
    get: (id: StorageRowId) => Optional<ExistingStorageObject<WordMetadata<T>>>,
    getAll: (ids: Array<StorageRowId>) => Array<Optional<ExistingStorageObject<WordMetadata<T>>>>,

    update: (updatedObject: ExistingStorageObject<WordMetadata<T>>) => void,
    updateAll: (updatedObjects: Array<ExistingStorageObject<WordMetadata<T>>>) => void,

    insert: (newObject: NewStorageObject<WordMetadata<T>>) => ExistingStorageObject<WordMetadata<T>>,
    insertAll: (newObjects: Array<NewStorageObject<WordMetadata<T>>>) => Array<ExistingStorageObject<WordMetadata<T>>>,

    delete: (id: StorageRowId) => void,
    deleteAll: (ids: Array<StorageRowId>) => void,

    // TODO that would be cool if we could make the return type match the wordClass query param, if provided
    search: (query: SearchQuery) => Array<ExistingStorageObject<WordMetadata<T>>>,
    random: (query: SearchQuery) => Optional<ExistingStorageObject<WordMetadata<T>>>,
    randomAll: (queries: Array<SearchQuery>) => Array<Optional<ExistingStorageObject<WordMetadata<T>>>>
}
