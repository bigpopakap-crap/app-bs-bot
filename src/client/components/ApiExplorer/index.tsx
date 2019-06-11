import * as React from 'react';

import { WordMetadata, WordQuery } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';
import { TemplateMetadata, TemplateQuery } from '../../../shared/types/word-template-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';

import CreateVerb from './CreateVerb';
import CreateAdjective from './CreateAdjective';
import CreateAdverb from './CreateAdverb';
import CreateNoun from './CreateNoun';
import ListWords from './ListWords';
import CreateTemplate from './CreateTemplate';
import ListTemplates from './ListTemplates';
import GenerateBS from './GenerateBS';

interface State {
  wordQuery: WordQuery;
  isLoadingWords: boolean;
  wordList: StoredObject<WordMetadata<WordClass>>[];
  wordNetworkError: Optional<string>;

  templateQuery: TemplateQuery;
  isLoadingTemplates: boolean;
  templateList: StoredObject<TemplateMetadata>[];
  templateNetworkError: Optional<string>;
}

const columnsParentStyle = {
  display: 'flex',
  width: '100%'
};

const columnStyle = {
  flex: '1 0 auto'
};

export default class ApiExplorer extends React.Component<{}, State> {
  // @ts-ignore TODO figure out why this has implicity 'any' type
  public constructor(props) {
    super(props);
    this.state = {
      wordQuery: {},
      isLoadingWords: false,
      wordList: [],
      wordNetworkError: null,

      templateQuery: {},
      isLoadingTemplates: false,
      templateList: [],
      templateNetworkError: null
    };
  }

  private async refreshWords() {
    this.setState({
      isLoadingWords: true
    });

    try {
      const response = await bsBotClient.request({
        url: '/words',
        params: this.state.wordQuery
      });

      this.setState({
        isLoadingWords: false,
        wordList: response.data
      });
    } catch (ex) {
      this.setState({
        isLoadingWords: false,
        wordList: [],
        wordNetworkError: `Network error ${ex}`
      });
    }
  }

  private async refreshTemplates() {
    this.setState({
      isLoadingTemplates: true
    });

    try {
      const response = await bsBotClient.request({
        url: '/templates',
        params: this.state.templateQuery
      });

      this.setState({
        templateList: response.data
      });
    } catch (ex) {
      this.setState({
        isLoadingTemplates: false,
        templateList: [],
        templateNetworkError: `Network error ${ex}`
      });
    }
  }

  private async createWord(word: WordMetadata<WordClass>) {
    await bsBotClient.request({
      method: 'POST',
      url: '/word',
      data: word
    });

    this.refreshWords();
  }

  private async createTemplate(template: TemplateMetadata) {
    await bsBotClient.request({
      method: 'POST',
      url: '/template',
      data: template
    });

    this.refreshTemplates();
  }

  private updateWordQuery(wordQuery: WordQuery) {
    this.setState({
      wordQuery
    });

    this.refreshWords();
  }

  private updateTemplateQuery(templateQuery: TemplateQuery) {
    this.setState({
      templateQuery
    });

    this.refreshTemplates();
  }

  public componentDidMount(): void {
    this.refreshWords();
    this.refreshTemplates();
  }

  public render(): React.ReactNode {
    return (
      <div>
        <section className="api-explorer__words" style={columnsParentStyle}>
          <div className="api-explorer__words__create-column" style={columnStyle}>
            <div>
              <h2>Create verb</h2>
              <CreateVerb onCreate={this.createWord} />
            </div>

            <div>
              <h2>Create adjective</h2>
              <CreateAdjective onCreate={this.createWord} />
            </div>

            <div>
              <h2>Create adverb</h2>
              <CreateAdverb onCreate={this.createWord} />
            </div>

            <div>
              <h2>Create noun</h2>
              <CreateNoun onCreate={this.createWord} />
            </div>
          </div>

          <div className="api-explorer__words__list-column" style={columnStyle}>
            <h2>Current words</h2>
            <ListWords
              isLoading={this.state.isLoadingWords}
              words={this.state.wordList}
              onUpdateQuery={this.updateWordQuery}
            />
          </div>
        </section>

        <div className="api-explorer__templates" style={columnsParentStyle}>
          <div className="api-explorer__templates__create-column" style={columnStyle}>
            <h2>Create template</h2>
            <CreateTemplate onCreate={this.createTemplate} />
          </div>
          <div className="api-explorer__templates__list-column" style={columnStyle}>
            <h2>Current templates</h2>
            <ListTemplates
              isLoading={this.state.isLoadingTemplates}
              templates={this.state.templateList}
              onUpdateQuery={this.updateTemplateQuery}
            />
          </div>
        </div>

        <div className="api-explorer__bs">
          <h2>Generate B.S.</h2>
          <GenerateBS />
        </div>
      </div>
    );
  }
}
