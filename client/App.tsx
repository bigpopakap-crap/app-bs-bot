import * as React from "react";
import {hot} from "react-hot-loader/root";

import BSTalker from "./BSTalker";
import {VocabName} from "../shared/bs/vocab";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h1>B.S. Bot</h1>
        <BSTalker vocabName={VocabName.biz} />
        <BSTalker vocabName={VocabName.shakespeare} />
      </div>
    );
  }
}

export default hot(App);
