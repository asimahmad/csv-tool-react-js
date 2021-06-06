 
import React, {useState, useEffect} from "react";
import { parse } from "papaparse";
import axios from 'axios'

const UploadCsv= ()=> {
  const [highlighted, setHighlighted] = useState(false);
  const [data, setData] = useState({});
  const [drop, setDroped] = useState(false);

//   const dropped = async(data) =>{
//     if(data){
//       for(let i=0;i<data.length-1;i++){
//           await axios({
//               method: 'POST',
//               url: 'http://localhost:3000/data/',
//               data: {
//               "id":data[i].id+300,"first_name":data[i].first_name, "age":data[i].age,"dob":data[i].dob, "salary":data[i].salary, "dept":data[i].dept
//               }
//             }).then((res) =>{
//               console.log("Res",res)
//             }, (err)=>{
//                 console.log(err);
//           })
//       }
//       console.log("From UploadCSV",data)  ;
//     }
// }

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

    console.log("From UploadCSV",data)  ;
  }
}

 const resetData = () =>{
   console.log("Reset data")
//   if(window.confirm("Are you sure")){
//     if(data){
//       for(let i=0;i<data.length-1;i++){
//            axios({
//               method: 'DELETE',
//               url: 'http://localhost:3000/data/',
//               params:data[i].id              
//             }).then((res) =>{
//               console.log("Res",res)
//             }, (err)=>{
//                 console.log(err);
//           })
//       }
//       console.log("Deleted data",data)  ;
//     }
//   }
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