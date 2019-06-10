import {
    SearchQuery,
    WordMetadata,
    WordsStorage
} from "../types/words-storage";
import {ExistingStorageObject, NewStorageObject, StorageRowId} from "../types/storage";
import {Optional} from "../../../shared/utils/optional";
import uuid from 'uuid/v4';
import randomItem from 'random-item';
import {WordClass} from "../../../shared/types/words";
// @ts-ignore
import intersect from 'intersect';

export default class <T extends WordClass> implements WordsStorage<T> {
    rows: Array<ExistingStorageObject<WordMetadata<T>>>;

    constructor() {
        this.rows = [];
    }

    get(id: StorageRowId) : Optional<ExistingStorageObject<WordMetadata<T>>> {
        return this.rows.find(row => row.id === id);
    }

    getAll(ids: Array<StorageRowId>) : Array<Optional<ExistingStorageObject<WordMetadata<T>>>> {
        return this.rows.filter(row => ids.includes(row.id));
    }

    insert(newObject: NewStorageObject<WordMetadata<T>>) : ExistingStorageObject<WordMetadata<T>> {
        const newObjectWithId = {
            id: uuid(),
            value: newObject
        };

        this.rows.push(newObjectWithId);
        return newObjectWithId;
    }

    insertAll(newObjects: Array<NewStorageObject<WordMetadata<T>>>) : Array<ExistingStorageObject<WordMetadata<T>>> {
        const newObjectsWithIds = newObjects.map(newObject => ({
            id: uuid(),
            value: newObject
        }));

        newObjectsWithIds.forEach(newObjectWithId => this.rows.push(newObjectWithId));
        return newObjectsWithIds;
    }

    update(updatedObject: ExistingStorageObject<WordMetadata<T>>) : void {
        const existingRow = this.get(updatedObject.id);
        if (existingRow) {
            existingRow.value = updatedObject.value;
        }
    }

    updateAll(updatedObjects: Array<ExistingStorageObject<WordMetadata<T>>>) : void {
        updatedObjects.forEach(updatedObject => this.update(updatedObject));
    }

    delete(id: StorageRowId) : void {
        const index = this.rows.findIndex(row => row.id === id);
        if (index >= 0) {
            this.rows.splice(index, 1);
        }
    }

    deleteAll(ids: Array<StorageRowId>) : void {
        ids.forEach(id => this.delete(id));
    }

    search(query: SearchQuery) : Array<ExistingStorageObject<WordMetadata<T>>> {
        // searchText?: string,
        // wordClass?: WordClass,
        // tags?: Array<WordTag>,
        // noNSFW?: boolean,

        return this.rows
            // Reject any word that is NSFW, if our query wants to filter them out
            .filter(row => !query.noNSFW || !row.value.isNSFW)
            // Reject any word that doesn't match the word class, if provided in the query
            .filter(row => !query.wordClass || row.value.value.class === query.wordClass)
            // Only include words that have ALL tags, unless the query doesn't specify any tags
            .filter(row => !query.tags || intersect(row.value.tags, query.tags).length === query.tags.length)
            // Only include words that have at least one form starting with the searchText, if provided by the query
            .filter(row => !query.searchText || row.value.forms.filter(form =>
                form.startsWith(query.searchText)
            ).length > 0);
    }

    random(query: SearchQuery) : Optional<ExistingStorageObject<WordMetadata<T>>> {
        return randomItem(this.search(query));
    }

    randomAll(queries: Array<SearchQuery>) : Array<Optional<ExistingStorageObject<WordMetadata<T>>>> {
        return queries.map(query => this.random(query));
    }

}
