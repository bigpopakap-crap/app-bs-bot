import * as React from 'react';

import { WordMetadata } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (verb: StoredObject<WordMetadata<WordClass.verb>>) => void;
}

export default class CreateVerb extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
