import * as React from 'react';

import { WordMetadata, WordQuery } from '../../../shared/types/word-metadata';
import { WordClass } from '../../../shared/types/words';
import { TemplateMetadata, TemplateQuery } from '../../../shared/types/word-template-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';
import { Optional } from '../../../shared/types/optional';

interface State {
  wordQuery: WordQuery;
  wordList: StoredObject<WordMetadata<WordClass>>[];
  wordNetworkError: Optional<string>;

  templateQuery: TemplateQuery;
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
      wordList: [],
      wordNetworkError: null,
      templateQuery: {},
      templateList: [],
      templateNetworkError: null
    };
  }

  private async refreshWords() {
    const response = await bsBotClient.request({
      url: '/words',
      params: this.state.wordQuery
    });

    this.setState({
      wordList: response.data
    });
  }

  private async refreshTemplates() {
    const response = await bsBotClient.request({
      url: '/templates',
      params: this.state.templateQuery
    });

    this.setState({
      templateList: response.data
    });
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
            </div>

            <div>
              <h2>Create adjective</h2>
            </div>

            <div>
              <h2>Create adverb</h2>
            </div>

            <div>
              <h2>Create noun</h2>
            </div>
          </div>

          <div className="api-explorer__words__list-column" style={columnStyle}>
            <h2>Current words</h2>
          </div>
        </section>

        <div className="api-explorer__templates" style={columnsParentStyle}>
          <div className="api-explorer__templates__create-column" style={columnStyle}>
            <h2>Create template</h2>
          </div>
          <div className="api-explorer__templates__list-column" style={columnStyle}>
            <h2>Current templates</h2>
          </div>
        </div>

        <div className="api-explorer__bs">
          <h2>Generate B.S.</h2>
        </div>
      </div>
    );
  }
}
