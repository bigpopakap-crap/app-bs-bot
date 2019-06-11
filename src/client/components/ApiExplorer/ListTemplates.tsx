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
    const templateListItems = this.props.templates.map(template => {
      const nsfw = template.value.isNSFW ? <span>(NSFW)</span> : null;

      const tags = template.value.tags.map(tag => (
        <span key={`${template.id}.tag.${tag}`}>({tag})</span>
      ));

      return (
        <li key={template.id}>
          <span>{template.value.value}</span>
          {nsfw}
          {tags}
        </li>
      );
    });

    if (this.props.isLoading) {
      return <div>Loading...</div>;
    } else if (this.props.templates.length === 0) {
      return <div>No templates</div>;
    } else {
      return <ol>{templateListItems}</ol>;
    }
  }
}
