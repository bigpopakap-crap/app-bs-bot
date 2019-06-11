import * as React from 'react';

import { VocabName } from '../shared/vocab';

import bsBotClient from './utils/bs-bot-client';

interface Props {
  vocabName: VocabName;
}

interface State {
  bsOutput: string;
}

const LOADING_TEXT = 'Loading...';

export default class BSTalker extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);
    this.state = {
      bsOutput: LOADING_TEXT
    };
  }

  public componentDidMount() {
    this.requestBS();
  }

  private requestBS() {
    this.setState({
      bsOutput: LOADING_TEXT
    });

    bsBotClient
      .request({
        url: '/bs',
        params: {
          vocabName: this.props.vocabName
        }
      })
      .then(
        response => {
          this.setState({
            bsOutput: response.data.bs
          });
        },
        error => {
          this.setState({
            bsOutput: error.toString()
          });
        }
      );
  }

  public render() {
    return (
      <div>
        <h3>{this.props.vocabName} talker says:</h3>
        <p>{this.state.bsOutput}</p>
        <button onClick={this.requestBS.bind(this)}>Refresh {this.props.vocabName}</button>
      </div>
    );
  }
}
