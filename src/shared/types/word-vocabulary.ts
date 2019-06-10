import {
    Verb,
    Adjective,
    Adverb,
    Noun
} from './words';
import { Template } from './word-templates';

export interface WordVocabulary {
    templates: Array<Template>,
    verbs: Array<Verb>,
    adjectives: Array<Adjective>,
    adverbs: Array<Adverb>,
    nouns: Array<Noun>,
}