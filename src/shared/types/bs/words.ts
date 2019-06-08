/**
 * A string representing a single word or word-phrase.
 */
type RawWordOrPhrase = string;

/* **************************************************************
                               GENERIC WORD
 ************************************************************** */

export enum WordClass {
    verb = 'verb',
    adjective = 'adjective',
    adverb = 'adverb',
    noun = 'noun',
}

export interface Word<T extends WordClass> {
    class: T,
}

/* **************************************************************
                               VERBS
 ************************************************************** */

export enum VerbTense {
    base = 'base',
    progressive = 'progressive',
    present = 'present',
    past = 'past',
}

export function isTensePersonIndependent(tense: VerbTense) : boolean {
    return tense === VerbTense.base || tense === VerbTense.progressive;
}

export enum VerbPerson {
    first = 'first',
    second = 'second',
    third = 'third',
    participle = 'participle',
}

interface VerbPersons {
    [VerbPerson.first]: RawWordOrPhrase,
    [VerbPerson.second]: RawWordOrPhrase,
    [VerbPerson.third]: RawWordOrPhrase,
    [VerbPerson.participle]: RawWordOrPhrase,
}

export interface Verb extends Word<WordClass.verb> {
    [VerbTense.base]: RawWordOrPhrase,
    [VerbTense.progressive]: RawWordOrPhrase,
    [VerbTense.present]: VerbPersons,
    [VerbTense.past]: VerbPersons,
}

export function isVerb(word : Word<WordClass>) : word is Verb {
    return word.class === WordClass.verb;
}

/* **************************************************************
                          ADJECTIVES/ADVERBS
 ************************************************************** */

export interface Adjective extends Word<WordClass.adjective> {
    base: RawWordOrPhrase,
}

export function isAdjective(word : Word<WordClass>) : word is Adjective {
    return word.class === WordClass.adjective;
}

export interface Adverb extends Word<WordClass.adverb> {
    base: RawWordOrPhrase,
}

export function isAdverb(word : Word<WordClass>) : word is Adverb {
    return word.class === WordClass.adverb;
}

/* **************************************************************
                               NOUNS
 ************************************************************** */

export enum NounPlurality {
    singular = 'singular',
    plural = 'plural',
}

export interface Noun extends Word<WordClass.noun> {
    [NounPlurality.singular]: RawWordOrPhrase,
    [NounPlurality.plural]: RawWordOrPhrase,
}

export function isNoun(word : Word<WordClass>) : word is Noun {
    return word.class === WordClass.noun;
}
