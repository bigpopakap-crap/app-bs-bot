import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { VocabName } from '../shared/vocab';

import bsBotClient from './utils/bs-bot-client';
import BSTalker from './BSTalker';
import ApiExplorer from './ApiExplorer';

interface State {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  vocabNames: VocabName[];
}

class App extends React.Component<{}, State> {
  // @ts-ignore TODO figure this ou t
  public constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      errorMessage: null,
      vocabNames: []
    };
  }

  public componentDidMount() {
    bsBotClient
      .request({
        url: '/vocabName'
      })
      .then(
        response => {
          this.setState({
            isLoading: false,
            isError: false,
            vocabNames: response.data.vocabNames
          });
        },
        error => {
          this.setState({
            isLoading: false,
            isError: true,
            errorMessage: error.toString()
          });
        }
      );
  }

  public render() {
    const content = (() => {
      if (this.state.isLoading) {
        return <p>Loading...</p>;
      } else if (this.state.isError) {
        return <p>{this.state.errorMessage}</p>;
      } else {
        return this.state.vocabNames.map(vocabName => (
          <BSTalker key={vocabName} vocabName={vocabName} />
        ));
      }
    })();

    return (
      <div>
        <div>
          <h1>B.S. Bot</h1>
          {content}
        </div>
        <div>
          <h2>API Explorer</h2>
          <ApiExplorer />
        </div>
      </div>
    );
  }
}

export default hot(App);
