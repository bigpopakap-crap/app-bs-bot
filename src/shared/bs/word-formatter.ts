import {
  Adjective,
  Adverb,
  isAdjective,
  isAdverb,
  isNoun,
  isVerb,
  Noun,
  Verb,
  VerbTense,
  Word,
  WordClass
} from '../types/words';
import {
  AdjectivePlaceholder,
  AdverbPlaceholder,
  isAdjectivePlaceholder,
  isAdverbPlaceholder,
  isNounPlaceholder,
  isVerbPlaceholder,
  NounPlaceholder,
  Placeholder,
  VerbPlaceholder
} from '../types/word-templates';

function formatVerb(placeholder: VerbPlaceholder, word: Verb): string {
  if (placeholder.tense === VerbTense.base || placeholder.tense === VerbTense.progressive) {
    return word[placeholder.tense];
  } else {
    if (!placeholder.person) {
      throw new Error(`Verb placeholder must define a person for tense=${placeholder.tense}`);
    }
    return word[placeholder.tense][placeholder.person];
  }
}

function formatAdjective(placeholder: AdjectivePlaceholder, word: Adjective): string {
  return word.base;
}

function formatAdverb(placeholder: AdverbPlaceholder, word: Adverb): string {
  return word.base;
}

function formatNoun(placeholder: NounPlaceholder, word: Noun): string {
  return word[placeholder.plurality];
}

export function formatWord<T extends WordClass>(
  placeholder: Placeholder<T>,
  word: Word<T>
): string {
  if (isVerbPlaceholder(placeholder) && isVerb(word)) {
    return formatVerb(placeholder, word);
  } else if (isAdjectivePlaceholder(placeholder) && isAdjective(word)) {
    return formatAdjective(placeholder, word);
  } else if (isAdverbPlaceholder(placeholder) && isAdverb(word)) {
    return formatAdverb(placeholder, word);
  } else if (isNounPlaceholder(placeholder) && isNoun(word)) {
    return formatNoun(placeholder, word);
  } else {
    throw new Error(
      `Unexpected placeholder=${JSON.stringify(placeholder)} and word=${JSON.stringify(word)}.
        This is either a new class of word, or the classes do not agree`
    );
  }
}
