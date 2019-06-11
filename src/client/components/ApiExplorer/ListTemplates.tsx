import * as React from 'react';

import { TemplateMetadata, TemplateQuery } from '../../../shared/types/word-template-metadata';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  isLoading: boolean;
  templates: StoredObject<TemplateMetadata>[];
  onUpdateQuery: (query: TemplateQuery) => void;
}

export default class ListTemplates extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
