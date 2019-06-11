import randomItem from 'random-item';

import { WordClass } from '../../../shared/types/words';
import { StoredObject, UnstoredObject, StorageRowId } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';
import { WordQuery, WordMetadata } from '../../../shared/types/word-metadata';
import { CrudableStorage, SearchableStorage } from '../types/storage-behaviors';

import WordTable from './word-table';

interface StorageAndClass {
  wordClass: WordClass;
  storage: WordTable<WordClass>;
}

export default class
  implements
    CrudableStorage<WordMetadata<WordClass>>,
    SearchableStorage<WordMetadata<WordClass>, WordQuery> {
  private allStoragesWithClass: StorageAndClass[];

  public constructor() {
    // Create a storage class for every word class
    this.allStoragesWithClass = Object.keys(WordClass).map(wordClass => ({
      // TODO remove this cast
      wordClass: wordClass as WordClass,
      storage: new WordTable<WordClass>()
    }));
  }

  public get(id: StorageRowId): Optional<StoredObject<WordMetadata<WordClass>>> {
    const results = this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .map(storage => storage.get(id))
      .filter(optionalWord => Boolean(optionalWord));

    if (results.length > 1) {
      throw new Error(`Word with id=${id} showed up in multiple tables! This should never happen`);
    } else if (results.length < 1) {
      return null;
    } else {
      return results[0];
    }
  }

  public getAll(ids: StorageRowId[]): Optional<StoredObject<WordMetadata<WordClass>>>[] {
    const foundWords = this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .map(storage => storage.getAll(ids))
      .reduce((acc, cur) => acc.concat(cur), [])
      // Filter only for words that have been found. Otherwise, there will be lots of empty optionals,
      // since any particular word only exists in one of the tables.
      .filter(optionalWord => Boolean(optionalWord));

    // Map the foundWords by their ids
    const foundWordsById = new Map<StorageRowId, Optional<StoredObject<WordMetadata<WordClass>>>>(
      foundWords.map(foundWord => [foundWord.id, foundWord])
    );

    // Finally, return the results in the same order
    return ids.map(id => (foundWordsById.has(id) ? foundWordsById.get(id) : null));
  }

  public insert(
    newObject: UnstoredObject<WordMetadata<WordClass>>
  ): StoredObject<WordMetadata<WordClass>> {
    const insertedObjects = this.allStoragesWithClass
      .filter(storageAndClass => storageAndClass.wordClass === newObject.value.class)
      .map(storageAndClass => storageAndClass.storage)
      .map(storage => storage.insert(newObject));

    const ids = insertedObjects.map(o => o.id);

    if (insertedObjects.length > 1) {
      throw new Error(`Inserted new word into multiple tables ids=${ids.join()}`);
    } else if (insertedObjects.length < 1) {
      throw new Error(`Did not insert word into any table word=${JSON.stringify(newObject)}`);
    } else {
      return insertedObjects[0];
    }
  }

  /**
   * Note: this doesn't necessarily return them  in the same order
   * @param newObjects
   */
  public insertAll(
    newObjects: UnstoredObject<WordMetadata<WordClass>>[]
  ): StoredObject<WordMetadata<WordClass>>[] {
    return this.allStoragesWithClass
      .map(storageAndClass =>
        storageAndClass.storage.insertAll(
          newObjects.filter(o => o.value.class === storageAndClass.wordClass)
        )
      )
      .reduce((acc, cur) => acc.concat(cur), []);
  }

  public update(updatedObject: StoredObject<WordMetadata<WordClass>>): void {
    // We can simply update in all tables without worrying about WordClass because
    // any table of the wrong wordClass will no-op pretty efficiently.
    this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .forEach(storage => storage.update(updatedObject));
  }

  public updateAll(updatedObjects: StoredObject<WordMetadata<WordClass>>[]): void {
    // We can simply update in all tables without worrying about WordClass because
    // any table of the wrong wordClass will no-op pretty efficiently for any of the words
    // that don't exist in the table, and will do partial updates for the words that do
    // exist in the table
    this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .forEach(storage => storage.updateAll(updatedObjects));
  }

  public delete(id: StorageRowId): void {
    // We can simply update in all tables without worrying about WordClass because
    // any table of the wrong wordClass will no-op pretty efficiently.
    this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .forEach(storage => storage.delete(id));
  }

  public deleteAll(ids: StorageRowId[]): void {
    // We can simply update in all tables without worrying about WordClass because
    // any table of the wrong wordClass will no-op pretty efficiently for any of the words
    // that don't exist in the table, and will do partial updates for the words that do
    // exist in the table
    this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .forEach(storage => storage.deleteAll(ids));
  }

  public search(query: WordQuery): StoredObject<WordMetadata<WordClass>>[] {
    return this.allStoragesWithClass
      .map(storageAndClass => storageAndClass.storage)
      .map(storage => storage.search(query))
      .reduce((acc, cur) => acc.concat(cur), []);
  }

  public random(query: WordQuery): Optional<StoredObject<WordMetadata<WordClass>>> {
    return randomItem(this.search(query));
  }

  public randomAll(queries: WordQuery[]): Optional<StoredObject<WordMetadata<WordClass>>>[] {
    return queries.map(query => this.random(query));
  }
}
