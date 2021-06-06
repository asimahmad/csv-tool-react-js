import React, {useState,useEffect} from 'react';
import axios from 'axios'
import _ from 'lodash'

const DataTable = () => {

    // const pageSize = 10;
    const [pageSize, setPageSize] = useState(25); 
    const headers = ["Name", "Age", "Date of birth", "Salary", "Department"]
    const [postsPerPage, setPostsPerPage] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("desc")
    // const [sorting, setSorting] = useState({colType:"", sortOrder:""})

    let [posts, setPosts] = useState();
    useEffect(()=> {
        document.title = 'Assesment by Asim'
        axios.get('http://localhost:3000/data/')
        .then(res =>{
            // for(let i=0;i<res.data.length;i++){
            //     aray.push(res.data[i])
            //     setPosts(res.data[i])
            //     setPostsPerPage(_(res.data[0]).slice(0).take(pageSize).value())
            // }
             //console.log(res.data);
             let array = []
             for(let i =0;i<res.data.length;i++){
                 for(let j=0;j<res.data[i].length;j++){
                    array.push(res.data[i][j])
                 }
             }
             //console.log("Main Array", array);
             //console.log("Main array",aray);
            setPosts(array);
            setPostsPerPage(_(array).slice(0).take(pageSize).value())
        }).catch(err =>{
            console.log(err)
        })
    },[])

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber-1)*pageSize;
        const postsPerPage = _(posts).slice(startIndex).take(pageSize).value();
        setPostsPerPage(postsPerPage)
    }

    const pageCount = posts? Math.ceil(posts.length/pageSize) :0
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
   
    const Download = () =>{
        let csvString;
        let csvRow = [];
        let dataArray = [['id','first_name', 'age', 'dob', 'salary', 'dept']];
        if(posts){
            for(let i =0;i<posts.length;i++){
            dataArray.push([posts[i].id,posts[i].first_name, posts[i].age, posts[i].dob,posts[i].salary, posts[i].dept])
            }}
            console.log("ArrayData length", dataArray.length)
            for(let i=0;i<dataArray.length;i++){
                csvRow.push(dataArray[i].join(","));
            }
            csvString = csvRow.join("%0A");
            //console.log(csvString)
        
        let a = document.createElement("a");
        a.href= 'data:attachment/csv,'+csvString;
        a.target = "_Blank";
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click()
    }

    const sortTable = (head, order)=>{
        //console.log("This from sort",head,order)
        if(order==="desc"){
            if(head==="Name"){
                posts = posts.sort((a,b) => a.first_name<b.first_name?1:-1)
            }
            else if(head==="Salary"){
                posts = posts.sort((a,b) => a.salary<b.salary?1:-1)
            }
            else if(head==="Age"){
                posts = posts.sort((a,b) => a.age<b.age?1:-1)
            }
            else if(head==="Date of birth"){
                posts = posts.sort((a,b) => a.dob<b.dob?1:-1)
            }
            else{
                posts = posts.sort((a,b) => a.dept<b.dept?1:-1)
            }
            setOrder("asec")
        }else{  
            if(head==="Name"){
                posts = posts.sort((a,b) => a.first_name>b.first_name?1:-1)
            }
            else if(head==="Salary"){
                posts = posts.sort((a,b) => a.salary>b.salary?1:-1)
            }
            else if(head==="Age"){
                posts = posts.sort((a,b) => a.age>b.age?1:-1)
            }
            else if(head==="Date of birth"){
                posts = posts.sort((a,b) => a.dob>b.dob?1:-1)
            }
            else{
                posts = posts.sort((a,b) => a.dept>b.dept?1:-1)
            }
            setOrder("asec")
        }
        paginate(currentPage)
    }

    return (
        <div>
            <button className="form-control download" onClick={() => Download()}>
                {posts?"download as csv":"Use the template"}
                </button>
            <input className="form-control pagesize" type='number' min="10" defaultValue={25} onChange={(e)=>
                { if(e.target.value<10 || e.target.value === null || e.target.value === ''){
                    setPageSize(25);
                } else if(e.target.value > posts.length){
                    console.log(posts.length)
                    setPageSize(e.target.value)
                } 
                else{
                    setPageSize(e.target.value)
                } }}/>

            <input  className="form-control search" type='text' placeholder='Search' onChange={(e) => {setSearch(e.target.value)}}/>
        
            {!postsPerPage? (""): (
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            {headers.map(head => (
                                <th key={head} shorttype={order} style={{cursor:'pointer'}} onClick={() =>sortTable(head,order)} >{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postsPerPage.filter(val =>{
                                if(search===''){
                                    return val;
                                }else if(
                                    val.first_name.toLowerCase().includes(search.toLowerCase()) ||
                                    val.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    val.salary.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    val.dob.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    val.dept.toLowerCase().includes(search.toLowerCase())
                                ){
                                    return val;
                                }
                            }).map((post, index) =>{
                                return (
                                <tr key={index}>
                                    <td>{post.first_name}</td>
                                    <td>{post.age}</td>
                                    <td>{post.dob}</td>
                                    <td>{post.salary}</td>
                                    <td>
                                        <p>
                                            {post.dept}
                                        </p>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {
                        pages.map((page) =>{
                            return <li key={page} className={ page === currentPage? "page-item active": "page-item"}>
                                <p className="page-link para" onClick={()=>paginate(page)}>{page}</p>
                                </li>
                        })
                    }
                </ul>
            </nav>
        </div>
    );
};

export default DataTable;