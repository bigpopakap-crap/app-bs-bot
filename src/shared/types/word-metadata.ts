import {Word, WordClass} from "./words";

type PageStart = string;
type PageEnd = string;
type WordTag = string;

export interface WordPagingDescriptor {
    start?: PageStart,
    end?: PageEnd,
}

export interface WordQuery {
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
