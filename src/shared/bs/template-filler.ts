import { Word, WordClass } from '../types/words';
import { ParsedTemplate, WordId, isPlaceholder } from '../types/word-templates';
import { WordQuery } from '../types/word-metadata';

import { formatWord } from './word-formatter';
import WordProvider from './word-provider';

export function getWordQueries(template: ParsedTemplate, noNSFW: boolean): WordQuery[] {
  return template.filter(isPlaceholder).map(placeholder => ({
    wordClass: placeholder.class,
    tags: [], // TODO allow placeholders to specify tags
    noNSFW
  }));
}

export function fillTemplate(template: ParsedTemplate, wordProvider: WordProvider): string {
  // Keep track of the the final map of words to use
  const wordMap = new Map<WordId, Word<WordClass>>();
  template.forEach(fragment => {
    if (isPlaceholder(fragment)) {
      // First instance of a wordId gets to define the word we use
      if (!wordMap.has(fragment.id)) {
        wordMap.set(fragment.id, wordProvider.provide(fragment.class));
      }
    }
  });

  // Join all the fragments together and fill in the words
  return template
    .map(fragment => {
      if (isPlaceholder(fragment)) {
        return formatWord(fragment, wordMap.get(fragment.id));
      } else {
        return fragment;
      }
    })
    .join('');
}

// /**
//  * Fills in words in the given template.
//  * @param template the template to fill in
//  */
// export function fillTemplate(template: ParsedTemplate, provideWord: WordProvider) {

// }
