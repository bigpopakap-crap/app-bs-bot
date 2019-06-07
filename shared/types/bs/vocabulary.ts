import {
    Verb,
    Adjective,
    Adverb,
    Noun
} from './words';
import { Template } from './templates';

export interface Vocabulary {
    templates: Array<Template>,
    verbs: Array<Verb>,
    adjectives: Array<Adjective>,
    adverbs: Array<Adverb>,
    nouns: Array<Noun>,
}