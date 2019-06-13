import * as React from 'react';

import bsBotClient from '../../utils/bs-bot-client';

interface State {
  isLoading: boolean;
  bsOutput: string[];
  errorMessage: string;
}

export default class GenerateBS extends React.Component<{}, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      bsOutput: [],
      errorMessage: ''
    };

    this.fetchBs = this.fetchBs.bind(this);
  }

  public fetchBs() {
    this.setState({
      isLoading: true
    });

    bsBotClient
      .request({
        url: '/bs',
        params: {
          count: 3,
          tags: []
        }
      })
      .then(
        response => {
          this.setState({
            isLoading: false,
            bsOutput: response.data,
            errorMessage: ''
          });
        },
        error => {
          this.setState({
            isLoading: false,
            bsOutput: [],
            errorMessage: `Network error ${error}`
          });
        }
      );
  }

  public render() {
    const bsOutputList = this.state.bsOutput.map((bs, index) => <li key={index}>{bs}</li>);

    const bsContent = this.state.isLoading ? (
      <div>
        <p>Loading...</p>
      </div>
    ) : (
      <div>
        <ul>{bsOutputList}</ul>
      </div>
    );

    const errorContent = this.state.isLoading ? (
      ''
    ) : (
      <div>
        <p>{this.state.errorMessage}</p>
      </div>
    );

    return (
      <div>
        <div>
          <button onClick={this.fetchBs}>Generate B.S.</button>
        </div>
        {bsContent}
        {errorContent}
      </div>
    );
  }
}
