import { Verb, Adjective, Adverb, Noun } from './words';
import { ParsedTemplate } from './word-templates';

export interface WordVocabulary {
  templates: ParsedTemplate[];
  verbs: Verb[];
  adjectives: Adjective[];
  adverbs: Adverb[];
  nouns: Noun[];
}
