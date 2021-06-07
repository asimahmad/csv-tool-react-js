 
import React, {useState, useEffect} from "react";
import { parse } from "papaparse";
import axios from 'axios'

const UploadCsv= ({setUpdated})=> {
  const [highlighted, setHighlighted] = useState(false);
  const [data, setData] = useState({});
  const [drop, setDroped] = useState(false);
  const [dele, setDele]= useState([]);
  const [resetClick, setResetClick] = useState(0);


  useEffect(()=> {
    axios.get('http://localhost:3000/data/')
    .then(res =>{
         let array = []
         for(let i =0;i<res.data.length;i++){
             for(let j=0;j<res.data[i].length;j++){
                array.push(res.data[i][j])
             }
         }
         console.log(array);
        setDele(array);
        console.log("From use effect of reset",dele)
    }).catch(err =>{
        console.log(err)
    })
},[resetClick])

const dropped = (data) =>{
  if(data){
         axios({
            method: 'POST',
            url: 'http://localhost:3000/data/',
            data: data
          }).then((res) =>{
            console.log("Res",res)
          }, (err)=>{
              console.log(err);
        })

    //console.log("From UploadCSV",data)  ;
  }
}

 const resetData = () =>{
    setResetClick(prev=>prev+1);
    if(dele){
      for(let i=1;i<dele.length;i++){
            axios({
               method: 'DELETE',
               url: 'http://localhost:3000/data/'+i,            
             }).then((res) =>{
               console.log("Res",res)
             }, (err)=>{
                 console.log(err);
           })
    }
      console.log("Deleted data",data)  ;
  }
  setUpdated(prev=>prev+1);
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
          setHighlighted(true)
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
              dropped(result.data);
              setDroped(true)
              setUpdated(prev => prev+1);
            });
        }}
      >
        {!drop?"DROP CSV file":"File uploaded"}
      </div>
      </div>
      <button className="form-control reset" onClick={() => resetData()}>Reset</button>
    </>
  );
}

export default UploadCsv;