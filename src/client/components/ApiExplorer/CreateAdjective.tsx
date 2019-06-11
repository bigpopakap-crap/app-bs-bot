import * as React from 'react';

import { WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';

interface Props {
  onCreate: (adjective: WordMetadata<WordClass.adjective>) => void;
}

export default class CreateAdjective extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
