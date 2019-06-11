import * as React from 'react';

import { WordMetadata } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';

interface Props {
  onCreate: (verb: WordMetadata<WordClass.verb>) => void;
}

export default class CreateVerb extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
