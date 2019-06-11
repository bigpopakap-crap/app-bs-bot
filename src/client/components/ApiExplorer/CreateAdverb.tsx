import * as React from 'react';

import { WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';

interface Props {
  onCreate: (adverb: WordMetadata<WordClass.adverb>) => void;
}
export default class CreateAdverb extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
