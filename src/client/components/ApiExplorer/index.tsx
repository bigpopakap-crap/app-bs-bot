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
  flex: '50%'
};

const boxStyle = {
  margin: '4px',
  padding: '12px',
  borderRadius: '4px',
  border: 'solid 1px black'
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

    this.refreshWords = this.refreshWords.bind(this);
    this.refreshTemplates = this.refreshTemplates.bind(this);
    this.updateWordQuery = this.updateWordQuery.bind(this);
    this.updateTemplateQuery = this.updateTemplateQuery.bind(this);
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
        isLoadingTemplates: false,
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
        <h3>Words</h3>
        <section style={columnsParentStyle}>
          <div style={columnStyle}>
            <div style={boxStyle}>
              <h2>Create verb</h2>
              <CreateVerb afterCreate={this.refreshWords} />
            </div>

            <div style={boxStyle}>
              <h2>Create adjective</h2>
              <CreateAdjective afterCreate={this.refreshWords} />
            </div>

            <div style={boxStyle}>
              <h2>Create adverb</h2>
              <CreateAdverb afterCreate={this.refreshWords} />
            </div>

            <div style={boxStyle}>
              <h2>Create noun</h2>
              <CreateNoun afterCreate={this.refreshWords} />
            </div>
          </div>

          <div style={columnStyle}>
            <div style={boxStyle}>
              <h2>Current words</h2>
              <ListWords
                isLoading={this.state.isLoadingWords}
                words={this.state.wordList}
                onUpdateQuery={this.updateWordQuery}
              />
            </div>
          </div>
        </section>

        <h3>Templates</h3>
        <section style={columnsParentStyle}>
          <div style={columnStyle}>
            <div style={boxStyle}>
              <h2>Create template</h2>
              <CreateTemplate afterCreate={this.refreshTemplates} />
            </div>
          </div>
          <div style={columnStyle}>
            <div style={boxStyle}>
              <h2>Current templates</h2>
              <ListTemplates
                isLoading={this.state.isLoadingTemplates}
                templates={this.state.templateList}
                onUpdateQuery={this.updateTemplateQuery}
              />
            </div>
          </div>
        </section>

        <h3>B.S.!</h3>
        <section style={columnsParentStyle}>
          <div style={columnStyle}>
            <div style={boxStyle}>
              <h2>Generate B.S.</h2>
              <GenerateBS />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
