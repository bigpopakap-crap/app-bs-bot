import {
    WordClass,
    VerbTense,
    VerbPerson,
    NounPlurality
} from 'shared/types/bs/words';

/* **************************************************************
                         PLACEHOLDERS
 ************************************************************** */

export type WordId = number;

/**
 * A placeholder for a word, with a specification for how to generate th at word.
 * These are not used directly, since each class of word
 * has its own data required.
 *
 * @see {@link VerbPlaceholder}
 * @see {@link AdjectivePlaceholder}
 * @see {@link AdverbPlaceholder}
 * @see {@link NounPlaceholder}
 *
 * Examples:
 * {2:noun}
 * {1:adverb}
 */
interface BasePlaceholder<T extends WordClass> {
    id: WordId,
    class: T,
}

/**
 * Examples:
 * {1:verb:past:first}
 * {2:verb:present:participle}
 * {3:verb:base}
 */
export interface VerbPlaceholder extends BasePlaceholder<WordClass.verb> {
    tense: VerbTense,
    person?: VerbPerson,
}

/**
 * Examples:
 * {1:adjective:50}
 * {2:adjective}
 */
export interface AdjectivePlaceholder extends BasePlaceholder<WordClass.adjective> {}

/**
 * Examples:
 * {1:adverb}
 */
export interface AdverbPlaceholder extends BasePlaceholder<WordClass.adverb> {}

/**
 * Examples:
 * {1:noun:singular}
 * {2:noun:plural}
 */
export interface NounPlaceholder extends BasePlaceholder<WordClass.noun> {
    plurality: NounPlurality,
}

export type Placeholder<T extends WordClass> =
    VerbPlaceholder
    | AdjectivePlaceholder
    | AdverbPlaceholder
    | NounPlaceholder;

export function isVerbPlaceholder(placeholder : Placeholder<WordClass>) : placeholder is VerbPlaceholder {
    return placeholder.class === WordClass.verb;
}

export function isAdjectivePlaceholder(placeholder : Placeholder<WordClass>) : placeholder is AdjectivePlaceholder {
    return placeholder.class === WordClass.adjective;
}

export function isAdverbPlaceholder(placeholder : Placeholder<WordClass>) : placeholder is AdverbPlaceholder {
    return placeholder.class === WordClass.adverb;
}

export function isNounPlaceholder(placeholder : Placeholder<WordClass>) : placeholder is NounPlaceholder {
    return placeholder.class === WordClass.noun;
}

/* **************************************************************
                               TEMPLATES
 ************************************************************** */

export enum PlaceholderDelimiter {
    START = '{',
    MIDDLE = ':',
    END = '}',
}

type TemplateFragment = string | Placeholder<WordClass>;

export function isPlaceholder(fragment : TemplateFragment) : fragment is Placeholder<WordClass> {
    return fragment && typeof fragment === 'object';
}

/**
 * A string representing a single sentence, paragraph, or anything that contains
 * placeholders and will be auto-filled in with words. It may have any of the
 * placeholders defined above.
 *
 * Example:
 * "We build {1:adjective} {2:noun:plurals}. Each {2:noun:singular} {3:verb:present:third} {4:adverb}."
 *
 * Might convert to:
 * "We build complex solutions. Each solution functions perfectly."
 */
export type Template = Array<TemplateFragment>
