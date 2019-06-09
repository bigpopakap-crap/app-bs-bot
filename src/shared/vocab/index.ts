import { Vocabulary } from 'shared/types/vocabulary';
import BIZ_VOCAB from './biz';
import SHAKESPEARE_VOCAB from './shakespeare';

export enum VocabName {
    biz = 'biz',
    shakespeare = 'shakespeare',
}

const VOCABS : Map<VocabName, Vocabulary> = new Map<VocabName, Vocabulary>([
    [VocabName.biz, BIZ_VOCAB],
    [VocabName.shakespeare, SHAKESPEARE_VOCAB]
]);

export default VOCABS;
