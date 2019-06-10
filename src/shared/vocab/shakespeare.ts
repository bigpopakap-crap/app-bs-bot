import {
    WordClass,
} from '../types/words';
import { WordVocabulary } from '../types/word-vocabulary';
import { parseTemplate } from '../bs';

const SHAKESPEARE_VOCAB : WordVocabulary = {
    templates: [
        parseTemplate('Zounds! Thou shalt not {1:verb:base} {2:adjective} {3:noun:plural}!'),
        parseTemplate('Lo and behold, ye nave! You {1:verb:base} {2:adverb}!'),
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
                participle: 'built',
            },
            past: {
                first: 'built',
                second: 'built',
                third: 'built',
                participle: 'built',
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
                participle: 'provided',
            },
            past: {
                first: 'provided',
                second: 'provided',
                third: 'provided',
                participle: 'provided',
            }
        }
    ],
    adjectives: [
        {
            class: WordClass.adjective,
            base: 'boorish',
        }
    ],
    adverbs: [
        {
            class: WordClass.adverb,
            base: 'boorishly',
        }
    ],
    nouns: [
        {
            class: WordClass.noun,
            singular: 'scoundrel',
            plural: 'scoundrels',
        }
    ]
};

export default SHAKESPEARE_VOCAB;
