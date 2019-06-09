import {
    Word,
    WordClass,
} from '../types/words';
import {
    Template,
    WordId,
    isPlaceholder,
} from '../types/templates';
import { formatWord } from './formatter';
import {WordProvider} from "./word-provider";

type WordMap = Map<WordId, Word<WordClass>>;

/**
 * Fills in words in the given template.
 * @param template the template to fill in
 * @param wordProvider something to provide words to use to fill in. It can be
 *                     randomized or not. It doesn't matter for this function.
 */
export default function(template: Template, provideWord: WordProvider) {
    // Keep track of the the final map of words to use
    const wordMap : WordMap = new Map();
    template.forEach(fragment => {
        if (isPlaceholder(fragment)) {
            // First instance of a wordId gets to define the word we use
            if (!wordMap.has(fragment.id)) {
                wordMap.set(fragment.id, provideWord(fragment.class));
            }
        }
    });

    // Join all the fragments together and fill in the words
    return template.map(fragment => {
        if (isPlaceholder(fragment)) {
            return formatWord(fragment, wordMap.get(fragment.id));
        } else {
            return fragment;
        }
    }).join('');
}
