import {
    Verb,
    Adjective,
    Adverb,
    Noun
} from 'shared/types/bs/words';
import { Template } from 'shared/types/bs/templates';

export interface Vocabulary {
    templates: Array<Template>,
    verbs: Array<Verb>,
    adjectives: Array<Adjective>,
    adverbs: Array<Adverb>,
    nouns: Array<Noun>,
}