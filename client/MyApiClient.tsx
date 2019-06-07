import * as React from "react";

import axios from "restyped-axios";
import { API_PATH, MyApi } from "shared/types/api";

interface Props {
  input: string;
}

interface State {
  isLoaded: boolean;
  output: string;
}

const client = axios.create<MyApi>({ baseURL: API_PATH });

export default class MyApiClient extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      output: null
    };
  }

  componentDidMount() {
    client
      .request({
        url: "/",
        params: {
          input: this.props.input
        }
      })
      .then(response => {
        this.setState({
          isLoaded: true,
          output: response.data.output
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          output: error.toString()
        });
      });
  }

  render() {
    return this.state.isLoaded ? (
      <p>{this.state.output}</p>
    ) : (
      <p>Loading...</p>
    );
  }
}
