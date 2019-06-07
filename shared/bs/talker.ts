import {
    Word,
    WordClass,
} from '../types/bs/words';
import { Vocabulary } from 'shared/types/bs/vocabulary';
import { pickRandom } from 'shared/utils/arrays';
import talk from 'shared/bs/talk';

export default class Talker {
    vocab: Vocabulary;

    constructor(vocab: Vocabulary) {
        this.vocab = vocab;
    }

    public talk(): string {
        // Pick a random template
        const template = pickRandom(this.vocab.templates);
        return talk(template, this.pickRandomWord.bind(this));
    }

    // TODO use <T extends WordClass> so that it's type-enforced that we get back a word of the same class
    private pickRandomWord(wordClass: WordClass) : Word<WordClass> {
        switch (wordClass) {
            case WordClass.noun:
                return pickRandom(this.vocab.nouns);
            case WordClass.verb:
                return pickRandom(this.vocab.verbs);
            case WordClass.adjective:
                return pickRandom(this.vocab.adjectives);
            case WordClass.adverb:
                return pickRandom(this.vocab.adverbs);
            default:
                throw new Error(`Unexpected wordClass=${wordClass}`);
        }
    }
}