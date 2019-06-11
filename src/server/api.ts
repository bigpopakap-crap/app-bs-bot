import express from 'express';
import RestypedRouter from 'restyped-express-async';
import HttpStatus from 'http-status-codes';
import randomItem from 'random-item';
import bodyParser from 'body-parser';

import BsBotApi from '../shared/types/bs-bot-api-restyped';
// TODO figure out why absolute path imports aren't working here
import { fillTemplate, randomWordProvider } from '../shared/bs';
import VOCABS, { VocabName } from '../shared/vocab';

import WordStorage from './storage/words';

const wordStorage = new WordStorage();

const app = express();
app.use(bodyParser.json());
const router = RestypedRouter<BsBotApi>(app);

router.get('/bs', async request => {
  const vocabName = request.query.vocabName;
  const vocab = VOCABS.get(vocabName);
  const template = randomItem(vocab.templates);
  return {
    bs: fillTemplate(template, randomWordProvider(vocab))
  };
});

router.get('/vocabName', async () => {
  return {
    vocabNames: Object.keys(VocabName) as VocabName[]
  };
});

/* ************************************************************************
                            INTERACT WITH WORDS
 ************************************************************************ */
router.get('/word/:id', async (request, response) => {
  const word = wordStorage.get(request.params.id);
  if (word) {
    return word;
  } else {
    response.status(HttpStatus.NOT_FOUND).end();
  }
});

router.put('/word/:id', async (request, response) => {
  const id = request.params.id;
  const updatedWord = request.body;

  if (id !== updatedWord.id) {
    response.status(HttpStatus.BAD_REQUEST).end();
  } else {
    wordStorage.update(updatedWord);
  }
});

router.delete('/word/:id', async request => {
  wordStorage.delete(request.params.id);
});

router.post('/word', async request => {
  return wordStorage.insert(request.body);
});

router.get('/words', async request => {
  return wordStorage.search(request.query);
});

router.post('/words', async request => {
  return wordStorage.insertAll(request.body);
});

router.put('/words', async request => {
  wordStorage.updateAll(request.body);
});

router.delete('/words', async request => {
  wordStorage.deleteAll(request.query.ids);
});

// Lastly, handle any unknown requests with a 404
app.get('*', async (request, response) => {
  response.status(404).end();
  return;
});

export default app;
