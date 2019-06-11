import { Word, WordClass } from './words';

type PageStart = string;
type PageEnd = string;
type WordTag = string;

// TODO use paging?
export interface WordPagingDescriptor {
  start?: PageStart;
  end?: PageEnd;
}

export interface WordQuery {
  searchText?: string;
  wordClass?: WordClass;
  tags?: WordTag[];
  noNSFW?: boolean;
}

export interface WordMetadata<T extends WordClass> {
  // TODO "forms" should be an internal database detail
  forms: string[];
  tags: WordTag[];
  isNSFW: boolean;
  value: Word<T>;
}
