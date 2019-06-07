import { MyType } from "shared/types/mytypes";

export const API_PATH = "/api";

export interface MyApi {
  "/": {
    GET: {
      query: {
        input: string;
      };
      response: MyType;
    };
  };
}
