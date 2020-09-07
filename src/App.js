import React from 'react';
import MultiplicationTable from './MultiplicationTable';

class App extends React.Component {
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    return (
      <div className="container-fluid" align="center">
        <div className="col" style={{ width: '302px' }}>
          <header>
            <h1>10 x 10</h1>
          </header>
          <MultiplicationTable />
        </div>
      </div>
    );
  }
}

export default App;
