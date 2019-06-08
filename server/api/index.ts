import express from "express";
import RestypedRouter from "restyped-express-async";
import { MyApi } from "shared/types/api";

// TODO figure out why absolute path imports aren't working here
import talk from '../../shared/bs/talk';
import { randomWordProvider} from "../../shared/bs/word-provider";
import VOCABS, {VocabName} from '../../shared/bs/vocab';
import {pickRandom} from "../../shared/utils/arrays";

const app = express();
const router = RestypedRouter<MyApi>(app);

router.get("/bs", async request => {
  const vocabName = request.query.vocabName;
  const vocab = VOCABS.get(vocabName);
  const template = pickRandom(vocab.templates);
  return {
    bs: talk(template, randomWordProvider(vocab))
  };
});

router.get('/vocabName', async request => {
  return {
    vocabNames: <Array<VocabName>> Object.keys(VocabName)
  }
});

// Lastly, handle any unknown requests with a 404
app.get('*', async (request, response) => {
  response.status(404).end();
  return;
});

export default app;
