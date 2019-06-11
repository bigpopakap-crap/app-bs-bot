import { WordVocabulary } from '../../shared/types/word-vocabulary';

import BIZ_VOCAB from './biz';
import SHAKESPEARE_VOCAB from './shakespeare';

export enum VocabName {
  biz = 'biz',
  shakespeare = 'shakespeare'
}

const VOCABS: Map<VocabName, WordVocabulary> = new Map<VocabName, WordVocabulary>([
  [VocabName.biz, BIZ_VOCAB],
  [VocabName.shakespeare, SHAKESPEARE_VOCAB]
]);

export default VOCABS;
