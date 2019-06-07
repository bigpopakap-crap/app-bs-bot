import * as React from "react";

import axios from "restyped-axios";
import { API_PATH, MyApi } from "shared/types/api";
import { MyType } from "shared/types/mytypes";

interface Props {
  input: string;
}

interface State {
  isLoaded: boolean;
  value: MyType | null;
}

const client = axios.create<MyApi>({ baseURL: API_PATH });

export default class MyApiClient extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      value: null
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
          value: response.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          value: {
            success: false,
            successMessage: null,
            errorMessage: error
          }
        });
      });
  }

  render() {
    return this.state.isLoaded ? (
      <p>{this.state.value.successMessage || this.state.value.errorMessage}</p>
    ) : (
      <p>Loading...</p>
    );
  }
}
