import * as React from 'react';

import { WordMetadata } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';

interface Props {
  onCreate: (noun: WordMetadata<WordClass.noun>) => void;
}

export default class CreateNoun extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
