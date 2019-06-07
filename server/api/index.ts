import express from "express";
import RestypedRouter from "restyped-express-async";
import { MyApi } from "shared/types/api";

const app = express();
const router = RestypedRouter<MyApi>(app);

router.get("/", async request => {
  const input = request.query.input;
  return {
    output: `My Api: ${input}`,
  };
});

export default app;
