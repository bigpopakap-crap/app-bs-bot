import * as React from 'react';

const columnsParentStyle = {
  display: 'flex',
  width: '100%'
};

const columnStyle = {
  flex: '1 0 auto'
};

export default class ApiExplorer extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <section className="api-explorer__words" style={columnsParentStyle}>
          <div className="api-explorer__words__create-column" style={columnStyle}>
            <div>
              <h2>Create verb</h2>
            </div>

            <div>
              <h2>Create adjective</h2>
            </div>

            <div>
              <h2>Create adverb</h2>
            </div>

            <div>
              <h2>Create noun</h2>
            </div>
          </div>

          <div className="api-explorer__words__list-column" style={columnStyle}>
            <h2>Current words</h2>
          </div>
        </section>

        <div className="api-explorer__templates" style={columnsParentStyle}>
          <div className="api-explorer__templates__create-column" style={columnStyle}>
            <h2>Create template</h2>
          </div>
          <div className="api-explorer__templates__list-column" style={columnStyle}>
            <h2>Current templates</h2>
          </div>
        </div>

        <div className="api-explorer__bs">
          <h2>Generate B.S.</h2>
        </div>
      </div>
    );
  }
}
