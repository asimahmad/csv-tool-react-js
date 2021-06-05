import './App.css';
import DataTable from './Components/DataTable'
import UploadCsv from './Components/UploadCsv'

function App() {
  return (
    <div className="App">
    <div className="container">
        <UploadCsv />
      <DataTable />
    </div>
    </div>
  );
}

export default App;
