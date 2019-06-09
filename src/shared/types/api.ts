export const API_PATH = "/api";

export interface MyApi {
  /* ************************************************************************
                           RANDOMLY GENERATE B.S.
   ************************************************************************ */
  "/bs/:vocabId": {
    GET: {
      params: {
        vocabId: string
      }
      response: {
        // TODO more vocab metadata?
        vocabId: string,
        bs: string
      };
    };
  },

  /* ************************************************************************
                                    VOCABULARIES
   ************************************************************************ */
  "/vocab": {
    GET: {
        query: {
            // TODO paging params, etc.
            // TODO filter params, etc.
        },
      response: {
        ids: Array<String>
      }
    }
  },

  "/vocab/:vocabId": {
    GET: {
      params: {
        vocabId: string
      },
      response: {
          // TODO details of the vocab
      }
    }
  },

    /* ************************************************************************
                                    TEMPLATES
   ************************************************************************ */

    "/template": {
        GET: {
            query: {
                // TODO paging params, etc.
                // TODO filter params, etc.
            },
            response:  {
                // TODO list the word ids, or the word itself
            }
        }
    },

    "template/:templateId": {
        GET: {
            response:  {
                // TODO get the details of a word
            }
        }
    },

    /* ************************************************************************
                                    WORDS
   ************************************************************************ */

    "/word": {
        GET: {
            query: {
                // TODO paging params, etc.
                // TODO filter params, etc.
            },
            response:  {
                // TODO list the word ids, or the word itself
            }
        }
    },

    "word/:wordId": {
        GET: {
            response:  {
                // TODO get the details of a word
            }
        }
    },
}
