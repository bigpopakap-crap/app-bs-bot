import express from "express";
import RestypedRouter from "restyped-express-async";
import { MyApi } from "shared/types/api";

const app = express();
const router = RestypedRouter<MyApi>(app);

router.get("/", async request => {
  const input = request.query.input;
  return {
    success: true,
    successMessage: `My Api: ${input}`,
    errorMessage: null
  };
});

export default app;
