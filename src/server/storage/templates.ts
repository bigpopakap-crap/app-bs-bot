import uuid from 'uuid/v4';
import randomItem from 'random-item';
// @ts-ignore
import intersect from 'intersect';

import { TemplateMetadata, TemplateQuery } from '../../shared/types/word-template-metadata';
import { StorageRowId, StoredObject, UnstoredObject } from '../../shared/types/storage';
import { Optional } from '../../shared/types/optional';
import { parseTemplate } from '../../shared/bs';

import { CrudableStorage, SearchableStorage } from './types/storage-behaviors';

export default class
  implements CrudableStorage<TemplateMetadata>, SearchableStorage<TemplateMetadata, TemplateQuery> {
  private rows: StoredObject<TemplateMetadata>[];

  public constructor() {
    this.rows = [];
  }

  public get(id: StorageRowId): Optional<StoredObject<TemplateMetadata>> {
    return this.rows.find(row => row.id === id);
  }

  public getAll(ids: StorageRowId[]): Optional<StoredObject<TemplateMetadata>>[] {
    return this.rows.filter(row => ids.includes(row.id));
  }

  public insert(newObject: UnstoredObject<TemplateMetadata>): StoredObject<TemplateMetadata> {
    // Before we insert any template into the table, make sure it is valid
    parseTemplate(newObject.value);

    const newObjectWithId = {
      id: uuid(),
      value: newObject
    };

    this.rows.push(newObjectWithId);
    return newObjectWithId;
  }

  public insertAll(
    newObjects: UnstoredObject<TemplateMetadata>[]
  ): StoredObject<TemplateMetadata>[] {
    const newObjectsWithIds = newObjects.map(newObject => ({
      id: uuid(),
      value: newObject
    }));

    newObjectsWithIds.forEach(newObjectWithId => this.rows.push(newObjectWithId));
    return newObjectsWithIds;
  }

  public update(updatedObject: StoredObject<TemplateMetadata>): void {
    // Before we update any template into the table, make sure the new value is valid
    parseTemplate(updatedObject.value.value);

    const existingRow = this.get(updatedObject.id);
    if (existingRow) {
      existingRow.value = updatedObject.value;
    }
  }

  public updateAll(updatedObjects: StoredObject<TemplateMetadata>[]): void {
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

  public search(query: TemplateQuery): StoredObject<TemplateMetadata>[] {
    return (
      this.rows
        // Reject any template that is NSFW, if our query wants to filter them out
        .filter(row => !query.noNSFW || !row.value.isNSFW)
        // Only include templates that have ALL tags, unless the query doesn't specify any tags
        .filter(
          row =>
            !query.tags ||
            query.tags.length === 0 ||
            intersect(row.value.tags, query.tags).length === query.tags.length
        )
        // Only include templates that have the searchText somewhere in it
        .filter(row => !query.searchText || row.value.value.includes(query.searchText))
    );
  }

  public random(query: TemplateQuery): Optional<StoredObject<TemplateMetadata>> {
    return randomItem(this.search(query));
  }

  public randomAll(queries: TemplateQuery[]): Optional<StoredObject<TemplateMetadata>>[] {
    return queries.map(query => this.random(query));
  }
}
