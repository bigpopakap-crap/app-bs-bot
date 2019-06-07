import * as React from "react";
import { hot } from "react-hot-loader/root";

import MyApiClient from "./MyApiClient";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <MyApiClient input="My Input" />
      </div>
    );
  }
}

export default hot(App);
