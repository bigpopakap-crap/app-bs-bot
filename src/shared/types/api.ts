import { VocabName } from "shared/bs/vocab";

export const API_PATH = "/api";

export interface MyApi {
  /* ************************************************************************
                           RANDOMLY GENERATE B.S.
   ************************************************************************ */
  "/bs": {
    GET: {
      query: {
        vocabName: VocabName
      };
      response: {
        bs: string
      };
    };
  },

  /* ************************************************************************
                           SEE WHAT VOCABS ARE AVAILABLE
   ************************************************************************ */
  "/vocabName": {
    GET: {
      response: {
        vocabNames: Array<VocabName>
      }
    }
  }
}
