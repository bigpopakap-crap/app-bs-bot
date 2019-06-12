import * as React from 'react';

import { StoredObject } from '../../../shared/types/storage';
import { WordMetadata, WordQuery } from '../../../shared/types/word-metadata';
import { isAdjective, isAdverb, isNoun, isVerb, WordClass } from '../../../shared/types/words';

interface Props {
  isLoading: boolean;
  words: StoredObject<WordMetadata<WordClass>>[];
  onUpdateQuery: (query: WordQuery) => void;
}

export default class ListWords extends React.Component<Props, {}> {
  public render() {
    const wordListItems = this.props.words.map(word => {
      const nsfw = word.value.isNSFW ? <span>(NSFW)</span> : null;

      const tags = word.value.tags.map(tag => <span key={`${word.id}.tag.${tag}`}>({tag})</span>);

      const wordClass = word.value.value.class;

      const wordBase = (() => {
        if (isAdjective(word.value.value)) {
          return word.value.value.base;
        } else if (isAdverb(word.value.value)) {
          return word.value.value.base;
        } else if (isNoun(word.value.value)) {
          return word.value.value.singular;
        } else if (isVerb(word.value.value)) {
          return word.value.value.base;
        } else {
          return `Unknown wordClass=${word.value.value.class}`;
        }
      })();

      return (
        <li key={word.id}>
          <span>
            {wordBase} ({wordClass})
          </span>
          {nsfw}
          {tags}
        </li>
      );
    });

    if (this.props.isLoading) {
      return <div>Loading...</div>;
    } else if (this.props.words.length === 0) {
      return <div>No words</div>;
    } else {
      return <ol>{wordListItems}</ol>;
    }
  }
}
