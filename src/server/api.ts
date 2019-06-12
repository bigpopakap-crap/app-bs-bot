import express from 'express';
import RestypedRouter, { TypedRequest } from 'restyped-express-async';
import HttpStatus from 'http-status-codes';
import bodyParser from 'body-parser';

import BsBotApi, { MultiBsQuery } from '../shared/types/bs-bot-api-restyped';
import { fillTemplate, getWordQueries } from '../shared/bs/template-filler';
import { parseTemplate } from '../shared/bs';

import WordStorage from './storage/words';
import TemplateStorage from './storage/templates';

/* ************************************************************************
                              configure database
 ************************************************************************ */
const wordStorage = new WordStorage();
const templateStorage = new TemplateStorage();

/* ************************************************************************
                              configure app
 ************************************************************************ */
const app = express();
app.use(bodyParser.json());
const router = RestypedRouter<BsBotApi>(app);

/* ************************************************************************
                            GENERATE B.S.
 ************************************************************************ */
function bs(multiBsQuery: MultiBsQuery): string[] {
  // Clean up inputs and use defaults
  const bsQueries = multiBsQuery.bsQueries || [];
  const noNSFW = Boolean(multiBsQuery.noNSFW);

  // Collect all the template queries we need
  const templateQueries = bsQueries.map(bsQuery => {
    // Clean up inputs and use defaults
    const tags = bsQuery.tags || [];
    return {
      noNSFW,
      tags
    };
  });

  // Look up random templates for these template queries
  const parsedTemplates = templateStorage
    .randomAll(templateQueries)
    .map(templateMetadata => templateMetadata.value.value)
    .map(unparsedTemplate => parseTemplate(unparsedTemplate));

  // Collect all the word queries we need to satisfy these templates
  const wordQueries = parsedTemplates
    .map(template => getWordQueries(template, noNSFW))
    .reduce((acc, curr) => acc.concat(curr), []);

  // Look up all the words for these word queries
  const words = wordStorage.randomAll(wordQueries).map(wordMetadata => wordMetadata.value.value);

  // Now we can actually fill in all the templates!
  return parsedTemplates.map(parsedTemplate => fillTemplate(parsedTemplate, words));
}

router.post('/bs', async request => {
  return bs(request.body);
});

router.get('/bs', async request => {
  const count = Math.max(request.query.count || 1, 1);

  return bs({
    noNSFW: request.query.noNSFW,
    bsQueries: Array(count).map(() => request.query)
  });
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

/* ************************************************************************
                            INTERACT WITH TEMPLATES
 ************************************************************************ */
router.get('/template/:id', async (request, response) => {
  const template = templateStorage.get(request.params.id);
  if (template) {
    return template;
  } else {
    response.status(HttpStatus.NOT_FOUND).end();
  }
});

router.put('/template/:id', async (request, response) => {
  const id = request.params.id;
  const updatedTemplate = request.body;

  if (id !== updatedTemplate.id) {
    response.status(HttpStatus.BAD_REQUEST).end();
  } else {
    templateStorage.update(updatedTemplate);
  }
});

router.delete('/template/:id', async request => {
  templateStorage.delete(request.params.id);
});

router.post('/template', async request => {
  return templateStorage.insert(request.body);
});

router.get('/templates', async request => {
  return templateStorage.search(request.query);
});

router.post('/templates', async request => {
  return templateStorage.insertAll(request.body);
});

router.put('/templates', async request => {
  templateStorage.updateAll(request.body);
});

router.delete('/templates', async request => {
  templateStorage.deleteAll(request.query.ids);
});

/* ************************************************************************
                            UNKNOWN REQUESTS
 ************************************************************************ */
app.all('*', async (request, response) => {
  response.status(404).end();
  return;
});

export default app;
