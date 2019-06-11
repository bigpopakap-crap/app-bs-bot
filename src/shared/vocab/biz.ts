import { WordClass } from '../types/words';
import { WordVocabulary } from '../types/word-vocabulary';
import { parseTemplate } from '../bs';

const BIZ_VOCAB: WordVocabulary = {
  templates: [
    parseTemplate(
      'Merchants hire Square to {1:verb:base} {2:adjective} {3:noun:plural}. These {2:adjective} {3:noun:plural} will be {1:verb:present:participle} using blockchain.'
    ),
    parseTemplate('Shall we sync up offline about {1:verb:progressive} a chat app?')
  ],
  verbs: [
    {
      class: WordClass.verb,
      base: 'build',
      progressive: 'building',
      present: {
        first: 'build',
        second: 'build',
        third: 'builds',
        participle: 'built'
      },
      past: {
        first: 'built',
        second: 'built',
        third: 'built',
        participle: 'built'
      }
    },
    {
      class: WordClass.verb,
      base: 'provide',
      progressive: 'providing',
      present: {
        first: 'provice',
        second: 'provide',
        third: 'provides',
        participle: 'provided'
      },
      past: {
        first: 'provided',
        second: 'provided',
        third: 'provided',
        participle: 'provided'
      }
    }
  ],
  adjectives: [
    {
      class: WordClass.adjective,
      base: 'remarkable'
    }
  ],
  adverbs: [
    {
      class: WordClass.adverb,
      base: 'remarkably'
    }
  ],
  nouns: [
    {
      class: WordClass.noun,
      singular: 'solution',
      plural: 'solutions'
    }
  ]
};

export default BIZ_VOCAB;
