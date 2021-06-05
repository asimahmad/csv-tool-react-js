 
import React, {useState} from "react";
import { parse } from "papaparse";

const UploadCsv= ()=> {
  const [highlighted, setHighlighted] = React.useState(false);
  const [data, setData] = useState([]);

  const resetData = () =>{
    setData([])
  }

  return (
    <>
    <div className="drag">
      <h1>CSV Tool</h1>
      <div
        className={`drag1 ${
          highlighted ? "dragHigh" : "dragNor"
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, { header: true });
              setData(() => result.data);
            });
        }}
      >
        DROP CSV file
      </div>
      </div>
      <button className="form-control reset" onClick={() => resetData()}>Reset</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.id}</strong>: {item.title}
            </li>
        ))}
      </ul>
    </>
  );
}

export default UploadCsv;