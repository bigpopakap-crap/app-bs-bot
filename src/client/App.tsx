import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import ApiExplorer from './components/ApiExplorer';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>Welcome to B.S. Bot!</h1>
        <ApiExplorer />
      </div>
    );
  }
}

export default hot(App);
