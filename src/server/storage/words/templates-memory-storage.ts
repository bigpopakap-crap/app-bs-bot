import { TemplatesStorage } from '../types/templates-storage';

export default class implements TemplatesStorage {
    get: (id: string) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>;
    getAll: (ids: string[]) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>[];
    update: (updatedObject: import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>) => void;
    updateAll: (updatedObjects: import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>[]) => void;
    insert: (newObject: import("../../../shared/types/word-template-metadata").TemplateMetadata) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>;
    insertAll: (newObjects: import("../../../shared/types/word-template-metadata").TemplateMetadata[]) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>[];
    delete: (id: string) => void;
    deleteAll: (ids: string[]) => void;
    search: (query: import("../../../shared/types/word-template-metadata").TemplateQuery) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>[];
    random: (query: import("../../../shared/types/word-template-metadata").TemplateQuery) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>;
    randomAll: (queries: import("../../../shared/types/word-template-metadata").TemplateQuery[]) => import("../../../shared/types/storage").StoredObject<import("../../../shared/types/word-template-metadata").TemplateMetadata>[];
}
