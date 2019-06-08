import {Word, WordClass} from "../types/bs/words";
import {Vocabulary} from "../types/bs/vocabulary";
import {pickRandom} from "../utils/arrays";

export type WordProvider = <T extends WordClass>(wordClass: T) => Word<T>;

export function randomWordProvider(vocab: Vocabulary): WordProvider {
    // TODO remove this type casting and figure out how to get Typescript to be ok with generics here
    return <WordProvider> ((wordClass) => {
        switch (wordClass) {
            case WordClass.noun:
                return pickRandom(vocab.nouns);
            case WordClass.verb:
                return pickRandom(vocab.verbs);
            case WordClass.adjective:
                return pickRandom(vocab.adjectives);
            case WordClass.adverb:
                return pickRandom(vocab.adverbs);
            default:
                throw new Error(`Unexpected wordClass=${wordClass}`);
        }
    });
}
