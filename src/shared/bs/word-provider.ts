import { Word, WordClass } from '../types/words';
import { Optional } from '../types/optional';

export default class WordProvider {
  private words: Word<WordClass>[];

  public constructor(words: Word<WordClass>[]) {
    this.words = words;
  }

  /**
   * Provides a words of a particular class, and then removes it from the list so it can only
   * be used once
   */
  public provide(wordClass: WordClass): Optional<Word<WordClass>> {
    const index = this.words.findIndex(word => word.class === wordClass);

    if (index >= 0) {
      return this.words.splice(index, 1)[0];
    } else {
      return null;
    }
  }
}
