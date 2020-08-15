import React from 'react';
import MultiplicationTable from './MultiplicationTable';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <header>
            <h1>10 x 10</h1>
          </header>
          <MultiplicationTable />
        </div>
      </div>
    </div>
  );
}

export default App;
