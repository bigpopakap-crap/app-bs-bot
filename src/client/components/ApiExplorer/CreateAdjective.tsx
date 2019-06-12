import * as React from 'react';

import { WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (adjective: StoredObject<WordMetadata<WordClass.adjective>>) => void;
}

export default class CreateAdjective extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
