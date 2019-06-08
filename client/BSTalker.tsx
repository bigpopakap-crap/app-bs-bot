import * as React from "react";

import api from './utils/api';
import {VocabName} from "shared/bs/vocab";

interface Props {
  vocabName: VocabName;
}

interface State {
  bsOutput: string;
}

const LOADING_TEXT = 'Loading...';

export default class BSTalker extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  constructor(props) {
    super(props);
    this.state = {
      bsOutput: LOADING_TEXT
    };
  }

  componentDidMount() {
    this.requestBS();
  }

  requestBS() {
    this.setState({
      bsOutput: LOADING_TEXT
    });

    api.request({
      url: "/bs",
      params: {
        vocabName: this.props.vocabName
      }
    })
    .then(response => {
      this.setState({
        bsOutput: response.data.bs
      });
    }, error => {
        this.setState({
            bsOutput: error.toString()
        });
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.vocabName} talker says:</h3>
        <p>{this.state.bsOutput}</p>
        <button onClick={this.requestBS.bind(this)}>Refresh {this.props.vocabName}</button>
      </div>
    );
  }
}