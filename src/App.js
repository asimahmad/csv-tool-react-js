import { useState } from 'react';
import './App.css';
import DataTable from './Components/DataTable'
import UploadCsv from './Components/UploadCsv'

function App() {
  const [updated, setUpdated] = useState(0);
  return (
    <div className="App">
    <div className="container">
        <UploadCsv setUpdated={setUpdated} />
      <DataTable updated={updated} />
    </div>
    </div>
  );
}

export default App;
