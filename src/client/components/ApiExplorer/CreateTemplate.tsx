import * as React from 'react';

import { TemplateMetadata } from '../../../shared/types/word-template-metadata';

interface Props {
  onCreate: (template: TemplateMetadata) => void;
}

export default class CreateTemplate extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
