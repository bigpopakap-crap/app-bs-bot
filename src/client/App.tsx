import * as React from "react";
import {hot} from "react-hot-loader/root";

import api from './utils/api';
import {VocabName} from "../shared/bs/vocab";

import BSTalker from "./BSTalker";

interface Props {}
interface State {
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
    vocabNames: Array<VocabName>
}

class App extends React.Component<Props, State> {
  // @ts-ignore TODO figure this ou t
  constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          isError: false,
          errorMessage: null,
          vocabNames: []
      };
  }

  componentDidMount() {
      api.request({
          url: '/vocabName'
      })
      .then(response => {
          this.setState({
              isLoading: false,
              isError: false,
              vocabNames: response.data.vocabNames
          })
      }, error => {
          this.setState({
              isLoading: false,
              isError: true,
              errorMessage: error.toString(),
          })
      })
  }

  render() {
    const content = (() => {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        } else if (this.state.isError) {
            return <p>{this.state.errorMessage}</p>;
        } else {
            return this.state.vocabNames.map(vocabName => (
                <BSTalker key={vocabName} vocabName={vocabName}/>
            ));
        }
    })();

    return (
      <div>
        <h1>B.S. Bot</h1>
        {content}
      </div>
    );
  }
}

export default hot(App);
