import { Word, WordClass } from '../types/words';
import { ParsedTemplate, WordId, isPlaceholder } from '../types/word-templates';
import { WordQuery } from '../types/word-metadata';

import { formatWord } from './word-formatter';

type WordMap = Map<WordId, Word<WordClass>>;

export function getWordQueries(template: ParsedTemplate, noNSFW: boolean): WordQuery[] {
  return [];
}

export function fillTemplate(template: ParsedTemplate, words: Word<WordClass>[]): string {
  return template.join('');
}

// /**
//  * Fills in words in the given template.
//  * @param template the template to fill in
//  */
// export function fillTemplate(template: ParsedTemplate, provideWord: WordProvider) {
//   // Keep track of the the final map of words to use
//   const wordMap: WordMap = new Map();
//   template.forEach(fragment => {
//     if (isPlaceholder(fragment)) {
//       // First instance of a wordId gets to define the word we use
//       if (!wordMap.has(fragment.id)) {
//         wordMap.set(fragment.id, provideWord(fragment.class));
//       }
//     }
//   });
//
//   // Join all the fragments together and fill in the words
//   return template
//     .map(fragment => {
//       if (isPlaceholder(fragment)) {
//         return formatWord(fragment, wordMap.get(fragment.id));
//       } else {
//         return fragment;
//       }
//     })
//     .join('');
// }
