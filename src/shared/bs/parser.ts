import {
    WordClass,
    VerbTense,
    isTensePersonIndependent,
    VerbPerson,
    NounPlurality,
} from '../types/words';
import {
    Template,
    WordId,
    PlaceholderDelimiter,
    VerbPlaceholder,
    AdjectivePlaceholder,
    AdverbPlaceholder,
    NounPlaceholder,
} from '../types/templates';

/**
 * Used to split the raw string into {@link }
 *
 * String not surrounded by the delimiter will be returned as-is.
 * Strings surrounded by the delimiter will be returned with the delimiters surrounding them.
 *
 * Ex.
 * 'this {is} a {test}'
 * --> ['this', '{is}', 'a', '{test}']
 */
const SPLIT_REGEX = new RegExp(
    // Ex. if the delimiters are { and }, this amounts to /{(.*?)}/
    `(${PlaceholderDelimiter.START}.*?${PlaceholderDelimiter.END})`
);

/**
 * This is used to test whether an individual fragment, as split
 * by {@link SPLIT_REGEX}, is a placeholder or not
 */
const FRAGMENT_IS_PLACEHOLDER_REGEX =  new RegExp(
    `${PlaceholderDelimiter.START}(.*?)${PlaceholderDelimiter.END}`
);

const VALID_WORD_CLASSES = Object.keys(WordClass);
const VALID_VERB_TENSES = Object.keys(VerbTense);
const VALID_VERB_PERSONS = Object.keys(VerbPerson);
const VALID_NOUN_PLURALITIES = Object.keys(NounPlurality);

export function parseTemplate(input : string) : Template {
    return input.split(SPLIT_REGEX).map(inputFragment => {
        const placeholderMatch = inputFragment.match(FRAGMENT_IS_PLACEHOLDER_REGEX);

        // If nothing matched the regex, this is not a placeholder and should be
        // returned raw.
        if (!placeholderMatch) {
            return inputFragment;
        }

        // Get the first match group, which is the contents of the placeholder
        const placeholderString = placeholderMatch[1];
        const placeholderParts = placeholderString.split(PlaceholderDelimiter.MIDDLE);

        // An "id" is required in the placeholder
        if (placeholderParts.length < 1) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "id" attribute must be defined.
        It should be an integer.`);
        }

        // The "id" must be an integer
        const idString = placeholderParts[0];
        if (!Number.isInteger(+idString)) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "id" attribute must be an integer.`);
        }
        const id = +idString;

        // The word class must be defined
        if (placeholderParts.length < 2) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "class" attribute must be defined.
        It should be one of ${VALID_WORD_CLASSES}`);
        }
        const classString = placeholderParts[1];
        const wordClass = (<any> WordClass)[classString]; // TODO fix this. See https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/

        if (!wordClass) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "class" attribute must be one of ${VALID_WORD_CLASSES}, but was ${classString}.`);
        }

        // Depending on the word class, parse the rest
        if (wordClass === WordClass.verb) {
            return parseVerb(id, inputFragment, placeholderParts);
        } else if (wordClass === WordClass.adjective) {
            return parseAdjective(id, inputFragment, placeholderParts);
        } else if (wordClass === WordClass.adverb) {
            return parseAdverb(id, inputFragment, placeholderParts);
        } else if (wordClass === WordClass.noun) {
            return parseNoun(id, inputFragment, placeholderParts);
        } else {
            throw new Error(`Developer error: unexpected wordClass=${wordClass}`);
        }
    });
}

function parseVerb(id: WordId, inputFragment: string, placeholderParts: Array<string>) : VerbPlaceholder {
    // The tense must be defined
    const tense = (function() {
        if (placeholderParts.length < 3) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "tense" attribute must be defined.
        It should be one of ${VALID_VERB_TENSES}`);
        }

        const tenseString = placeholderParts[2];
        const tense = (<any> VerbTense)[tenseString]; // TODO fix this. See https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/

        if (!tense) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "tense" attribute must be one of ${VALID_VERB_TENSES}, but was ${tenseString}.`);
        }

        return tense;
    })();

    // The "person" must be defined
    const person = (function() {
        if (placeholderParts.length < 4) {
            if (isTensePersonIndependent(tense)) {
                // omitting the "person" is allowed for this tense
                return null;
            } else {
                throw new Error(`Error parsing fragment="${inputFragment}". The "person" attribute must be defined.
          It should be one of ${VALID_VERB_PERSONS}`);
            }
        }

        const personString = placeholderParts[3];
        const person = (<any>VerbPerson)[personString]; // TODO fix this. See https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/

        if (!person) {
            throw new Error(`Error parsing fragment="${inputFragment}". The "person" attribute must be one of ${VALID_VERB_PERSONS}, but was ${personString}.`);
        }

        return person;
    })();

    return {
        id,
        class: WordClass.verb,
        tense,
        person,
    };
}

function parseAdjective(id: WordId, inputFragment: string, placeholderParts: Array<string>) : AdjectivePlaceholder {
    return {
        id,
        class: WordClass.adjective,
    };
}

function parseAdverb(id: WordId, inputFragment: string, placeholderParts: Array<string>) : AdverbPlaceholder {
    return {
        id,
        class: WordClass.adverb,
    };
}

function parseNoun(id: WordId, inputFragment: string, placeholderParts: Array<string>) : NounPlaceholder {
    // The plurality must be defined
    if (placeholderParts.length < 3) {
        throw new Error(`Error parsing fragment="${inputFragment}". The "plurality" attribute must be defined.
      It should be one of ${VALID_NOUN_PLURALITIES}`);
    }

    const pluralityString = placeholderParts[2];
    const plurality = (<any> NounPlurality)[pluralityString]; // TODO fix this. See https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/

    if (!plurality) {
        throw new Error(`Error parsing fragment="${inputFragment}". The "plurality" attribute must be one of ${VALID_NOUN_PLURALITIES}, but was ${pluralityString}.`);
    }

    return {
        id,
        class: WordClass.noun,
        plurality,
    }
}
