import { StoredObject, UnstoredObject, StorageRowId } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';
import { TemplateMetadata, TemplateQuery } from '../../../shared/types/word-template-metadata';

export interface TemplatesStorage {
  get: (id: StorageRowId) => Optional<StoredObject<TemplateMetadata>>;
  getAll: (ids: StorageRowId[]) => Optional<StoredObject<TemplateMetadata>>[];

  update: (updatedObject: StoredObject<TemplateMetadata>) => void;
  updateAll: (updatedObjects: StoredObject<TemplateMetadata>[]) => void;

  insert: (newObject: UnstoredObject<TemplateMetadata>) => StoredObject<TemplateMetadata>;
  insertAll: (newObjects: UnstoredObject<TemplateMetadata>[]) => StoredObject<TemplateMetadata>[];

  delete: (id: StorageRowId) => void;
  deleteAll: (ids: StorageRowId[]) => void;

  // TODO that would be cool if we could make the return type match the wordClass query param, if provided
  search: (query: TemplateQuery) => StoredObject<TemplateMetadata>[];
  random: (query: TemplateQuery) => Optional<StoredObject<TemplateMetadata>>;
  randomAll: (queries: TemplateQuery[]) => Optional<StoredObject<TemplateMetadata>>[];
}
