import {SearchQuery, WordMetadata, WordsStorage} from "../types/words-storage";
import {WordClass} from "../../../shared/types/words";
import WordsMemoryStorage from './words-memory-storage';
import {ExistingStorageObject, NewStorageObject, StorageRowId} from "../types/storage";
import {Optional} from "../../../shared/utils/optional";
import randomItem = require("random-item");

interface StorageAndClass {
    wordClass: WordClass,
    storage: WordsMemoryStorage<WordClass>
}

export default class implements WordsStorage<WordClass> {
    private allStoragesWithClass: Array<StorageAndClass>;

    constructor() {
        // Create a storage class for every word class
        this.allStoragesWithClass = Object.keys(WordClass).map(wordClass => ({
            // TODO remove this cast
            wordClass: <WordClass> wordClass,
            storage: new WordsMemoryStorage<WordClass>()
        }));
    }

    get(id: StorageRowId) : Optional<ExistingStorageObject<WordMetadata<WordClass>>> {
        const results =  this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .map(storage => storage.get(id));

        if (results.length > 1) {
            throw new Error(`Word with id=${id} showed up in multiple tables! This should never happen`);
        } else if (results.length < 1) {
            return null;
        } else {
            return results[0];
        }
    }

    getAll(ids: Array<StorageRowId>) : Array<Optional<ExistingStorageObject<WordMetadata<WordClass>>>> {
        const foundWords =  this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .map(storage => storage.getAll(ids))
            .reduce((acc, cur) => acc.concat(cur), [])
            // Filter only for words that have been found. Otherwise, there will be lots of empty optionals,
            // since any particular word only exists in one of the tables.
            .filter(optionalWord => Boolean(optionalWord))

        // Map the foundWords by their ids
        const foundWordsById = new Map<StorageRowId, Optional<ExistingStorageObject<WordMetadata<WordClass>>>>(
            foundWords.map(foundWord => [foundWord.id, foundWord])
        );

        // Finally, return the results in the same order
        return ids.map(id => foundWordsById.has(id) ? foundWordsById.get(id) : null);
    }

    insert(newObject: NewStorageObject<WordMetadata<WordClass>>) : ExistingStorageObject<WordMetadata<WordClass>> {
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
    insertAll(newObjects: Array<NewStorageObject<WordMetadata<WordClass>>>) : Array<ExistingStorageObject<WordMetadata<WordClass>>> {
        return this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage.insertAll(newObjects.filter(o => o.value.class === storageAndClass.wordClass)))
            .reduce((acc, cur) => acc.concat(cur), []);
    }

    update(updatedObject: ExistingStorageObject<WordMetadata<WordClass>>) : void {
        // We can simply update in all tables without worrying about WordClass because
        // any table of the wrong wordClass will no-op pretty efficiently.
        this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .forEach(storage => storage.update(updatedObject));
    }

    updateAll(updatedObjects: Array<ExistingStorageObject<WordMetadata<WordClass>>>) : void {
        // We can simply update in all tables without worrying about WordClass because
        // any table of the wrong wordClass will no-op pretty efficiently for any of the words
        // that don't exist in the table, and will do partial updates for the words that do
        // exist in the table
        this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .forEach(storage => storage.updateAll(updatedObjects));
    }

    delete(id: StorageRowId) : void {
        // We can simply update in all tables without worrying about WordClass because
        // any table of the wrong wordClass will no-op pretty efficiently.
        this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .forEach(storage => storage.delete(id));
    }

    deleteAll(ids: Array<StorageRowId>) : void {
        // We can simply update in all tables without worrying about WordClass because
        // any table of the wrong wordClass will no-op pretty efficiently for any of the words
        // that don't exist in the table, and will do partial updates for the words that do
        // exist in the table
        this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .forEach(storage => storage.deleteAll(ids));
    }

    search(query: SearchQuery) : Array<ExistingStorageObject<WordMetadata<WordClass>>> {
        return this.allStoragesWithClass
            .map(storageAndClass => storageAndClass.storage)
            .map(storage => storage.search(query))
            .reduce((acc, cur) => acc.concat(cur), []);
    }

    random(query: SearchQuery) : Optional<ExistingStorageObject<WordMetadata<WordClass>>> {
        return randomItem(this.search(query));
    }

    randomAll(queries: Array<SearchQuery>) : Array<Optional<ExistingStorageObject<WordMetadata<WordClass>>>> {
        return queries.map(query => this.random(query));
    }

}
