import { UnparsedTemplate } from './word-templates';

type PageStart = string;
type PageEnd = string;
export type TemplateTag = string;

// TODO use paging?
export interface TemplatePagingDescriptor {
  start?: PageStart;
  end?: PageEnd;
}

export interface TemplateQuery {
  searchText?: string;
  tags?: TemplateTag[];
  noNSFW?: boolean;
}

export interface TemplateMetadata {
  tags: TemplateTag[];
  isNSFW: boolean;
  value: UnparsedTemplate;
}
