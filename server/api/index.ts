import express from "express";
import RestypedRouter from "restyped-express-async";
import { MyApi } from "shared/types/api";

// TODO figure out why absolute path imports aren't working here
import Talker from '../../shared/bs/talker';
import Vocab from '../../shared/bs/vocab';

const app = express();
const router = RestypedRouter<MyApi>(app);

router.get("/bs", async request => {
  const vocab = request.query.vocab;
  return {
    bs: new Talker(Vocab.get(vocab)).talk()
  };
});

export default app;
