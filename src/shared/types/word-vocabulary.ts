import { Verb, Adjective, Adverb, Noun } from './words';
import { Template } from './word-templates';

export interface WordVocabulary {
  templates: Template[];
  verbs: Verb[];
  adjectives: Adjective[];
  adverbs: Adverb[];
  nouns: Noun[];
}
