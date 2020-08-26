import React from 'react';
import MultiplicationTable from './MultiplicationTable';

function App() {
  return (
    <div className="container-fluid" align="center">

        <div className="col"  style={{width: "302px"}}>
          <header>
            <h1>10 x 10</h1>
          </header>
          <MultiplicationTable />
        </div>

    </div>
  );
}

export default App;
