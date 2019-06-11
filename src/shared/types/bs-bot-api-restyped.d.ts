import { VocabName } from '../vocab';

import { Optional } from './optional';
import { StorageRowId, StoredObject } from './storage';
import { WordMetadata, WordQuery } from './word-metadata';
import { WordClass } from './words';

export default interface BsBotApi {
  /* ************************************************************************
                             RANDOMLY GENERATE B.S.
     ************************************************************************ */
  '/bs': {
    GET: {
      query: {
        vocabName: VocabName;
      };
      response: {
        bs: string;
      };
    };
  };

  /* ************************************************************************
                             SEE WHAT VOCABS ARE AVAILABLE
     ************************************************************************ */
  '/vocabName': {
    GET: {
      response: {
        vocabNames: VocabName[];
      };
    };
  };

  /* ************************************************************************
                            INTERACT WITH WORDS
     ************************************************************************ */
  '/word/:id': {
    /**
     * Get a single word by ID
     */
    GET: {
      params: {
        id: StorageRowId;
      };
      response: Optional<StoredObject<WordMetadata<WordClass>>>;
    };

    /**
     * Update (replace) a single existing word
     */
    PUT: {
      params: {
        id: StorageRowId;
      };
      body: StoredObject<WordMetadata<WordClass>>;
      // TODO respond with the updated value
    };

    /**
     * Delete a single existing word
     */
    DELETE: {
      params: {
        id: StorageRowId;
      };
      // TODO respond with something indicating whether it was deleted
    };
  };

  '/word': {
    /**
     * Create a single word
     */
    POST: {
      body: WordMetadata<WordClass>;
      response: StoredObject<WordMetadata<WordClass>>;
    };
  };

  '/words': {
    /**
     * Get multiple words with filters/query
     */
    GET: {
      query: WordQuery;
      response: StoredObject<WordMetadata<WordClass>>[];
    };

    /**
     * Create multiple words
     */
    POST: {
      body: WordMetadata<WordClass>[];
      response: StoredObject<WordMetadata<WordClass>>[];
    };

    /**
     * Update (replace) multiple existing words
     */
    PUT: {
      body: StoredObject<WordMetadata<WordClass>>[];
      // TODO respond with the updated values
    };

    /**
     * Delete multilpe existing words
     */
    DELETE: {
      query: {
        ids: StorageRowId[];
        // TODO respond with something indicating which ones were deleted
      };
    };
  };
}
