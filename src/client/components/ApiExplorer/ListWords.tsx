import * as React from 'react';

import { StoredObject } from '../../../shared/types/storage';
import { WordMetadata, WordQuery } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';

interface Props {
  isLoading: boolean;
  words: StoredObject<WordMetadata<WordClass>>[];
  onUpdateQuery: (query: WordQuery) => void;
}

export default class ListWords extends React.Component<Props, {}> {
  public render() {
    return <div>TODO</div>;
  }
}
