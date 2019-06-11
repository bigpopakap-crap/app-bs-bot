import uuid from 'uuid/v4';
import randomItem from 'random-item';
// @ts-ignore TODO un-ignore this if/when this package has a @types/ package
import intersect from 'intersect';

import { WordsStorage } from '../types/words-storage';
import { StoredObject, UnstoredObject, StorageRowId } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';
import { WordClass } from '../../../shared/types/words';
// @ts-ignore
import { WordQuery, WordMetadata } from '../../../shared/types/word-metadata';

export default class<T extends WordClass> implements WordsStorage<T> {
  private rows: StoredObject<WordMetadata<T>>[];

  public constructor() {
    this.rows = [];
  }

  public get(id: StorageRowId): Optional<StoredObject<WordMetadata<T>>> {
    return this.rows.find(row => row.id === id);
  }

  public getAll(ids: StorageRowId[]): Optional<StoredObject<WordMetadata<T>>>[] {
    return this.rows.filter(row => ids.includes(row.id));
  }

  public insert(newObject: UnstoredObject<WordMetadata<T>>): StoredObject<WordMetadata<T>> {
    const newObjectWithId = {
      id: uuid(),
      value: newObject
    };

    this.rows.push(newObjectWithId);
    return newObjectWithId;
  }

  public insertAll(newObjects: UnstoredObject<WordMetadata<T>>[]): StoredObject<WordMetadata<T>>[] {
    const newObjectsWithIds = newObjects.map(newObject => ({
      id: uuid(),
      value: newObject
    }));

    newObjectsWithIds.forEach(newObjectWithId => this.rows.push(newObjectWithId));
    return newObjectsWithIds;
  }

  public update(updatedObject: StoredObject<WordMetadata<T>>): void {
    const existingRow = this.get(updatedObject.id);
    if (existingRow) {
      existingRow.value = updatedObject.value;
    }
  }

  public updateAll(updatedObjects: StoredObject<WordMetadata<T>>[]): void {
    updatedObjects.forEach(updatedObject => this.update(updatedObject));
  }

  public delete(id: StorageRowId): void {
    const index = this.rows.findIndex(row => row.id === id);
    if (index >= 0) {
      this.rows.splice(index, 1);
    }
  }

  public deleteAll(ids: StorageRowId[]): void {
    ids.forEach(id => this.delete(id));
  }

  public search(query: WordQuery): StoredObject<WordMetadata<T>>[] {
    // searchText?: string,
    // wordClass?: WordClass,
    // tags?: Array<WordTag>,
    // noNSFW?: boolean,

    return (
      this.rows
        // Reject any word that is NSFW, if our query wants to filter them out
        .filter(row => !query.noNSFW || !row.value.isNSFW)
        // Reject any word that doesn't match the word class, if provided in the query
        .filter(row => !query.wordClass || row.value.value.class === query.wordClass)
        // Only include words that have ALL tags, unless the query doesn't specify any tags
        .filter(
          row => !query.tags || intersect(row.value.tags, query.tags).length === query.tags.length
        )
        // Only include words that have at least one form starting with the searchText, if provided by the query
        .filter(
          row =>
            !query.searchText ||
            row.value.forms.filter(form => form.startsWith(query.searchText)).length > 0
        )
    );
  }

  public random(query: WordQuery): Optional<StoredObject<WordMetadata<T>>> {
    return randomItem(this.search(query));
  }

  public randomAll(queries: WordQuery[]): Optional<StoredObject<WordMetadata<T>>>[] {
    return queries.map(query => this.random(query));
  }
}
