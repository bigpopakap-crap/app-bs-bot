import {Word, WordClass} from "../types/words";
import {Vocabulary} from "../types/vocabulary";
import randomItem from 'random-item';

export type WordProvider = <T extends WordClass>(wordClass: T) => Word<T>;

export function randomWordProvider(vocab: Vocabulary): WordProvider {
    // TODO remove this type casting and figure out how to get Typescript to be ok with generics here
    return <WordProvider> ((wordClass) => {
        switch (wordClass) {
            case WordClass.noun:
                return randomItem(vocab.nouns);
            case WordClass.verb:
                return randomItem(vocab.verbs);
            case WordClass.adjective:
                return randomItem(vocab.adjectives);
            case WordClass.adverb:
                return randomItem(vocab.adverbs);
            default:
                throw new Error(`Unexpected wordClass=${wordClass}`);
        }
    });
}
