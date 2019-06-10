import express from "express";
import RestypedRouter from "restyped-express-async";
import BsBotApi from "../shared/types/bs-bot-api-restyped";

// TODO figure out why absolute path imports aren't working here
import { fillTemplate } from '../shared/bs';
import { randomWordProvider} from "../shared/bs";
import VOCABS, {VocabName} from '../shared/vocab';
import randomItem from 'random-item';

const app = express();
const router = RestypedRouter<BsBotApi>(app);

router.get("/bs", async request => {
  const vocabName = request.query.vocabName;
  const vocab = VOCABS.get(vocabName);
  const template = randomItem(vocab.templates);
  return {
    bs: fillTemplate(template, randomWordProvider(vocab))
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
