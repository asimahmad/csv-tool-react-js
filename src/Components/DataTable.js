import React, {useState,useEffect} from 'react';
import axios from 'axios'
import _ from 'lodash'

const DataTable = () => {

    // const pageSize = 10;
    const [pageSize, setPageSize] = useState(10); 
    const headers = ["Id", "UserId", "Title", "Status"]
    const [postsPerPage, setPostsPerPage] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    // const [sorting, setSorting] = useState({colType:"", sortOrder:""})

    const [posts, setPosts] = useState();
    useEffect(()=> {
        document.title = 'Assesment by Asim'
        axios.get('http://jsonplaceholder.typicode.com/todos')
        .then(res =>{
            // console.log(res.data);
            setPosts(res.data);
            setPostsPerPage(_(res.data).slice(0).take(pageSize).value())
        }).catch(err =>{
            console.log(err)
        })
    }, [])

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber-1)*pageSize;
        const postsPerPage = _(posts).slice(startIndex).take(pageSize).value();
        setPostsPerPage(postsPerPage)
    }

    const pageCount = posts? Math.ceil(posts.length/pageSize) :0
    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    //console.log(pages);


    //console.log("Post l",posts.length)

    const Download = () =>{
        let csvRow = [];
        let dataArray = [['id', 'userId', 'title', 'completed']];
        //dataArray.push([1,2,"Asim",true]);
        //console.log(dataArray)
        for(let i =0;i<posts.length;i++){
           dataArray.push([posts[i].id, posts[i].userId, posts[i].title, posts[i].completed])
            //console.log(posts[i].id, posts[i].userId, posts[i].title, posts[i].completed)
            //console.log(posts[i]);
        }
        // for(let i=0;i<dataArray.length;i++){
        //     console.log(dataArray[i]);
        // }
       // console.log("ArrayData", dataArray);
        console.log("ArrayData length", dataArray.length)
        for(let i=0;i<dataArray.length;i++){
            csvRow.push(dataArray[i].join(","));
    //        console.log("Data Values",dataArray[i]);
    //        console.log(i);
        }
        let csvString = csvRow.join("%0A");
        console.log(csvString)
        //console.log(csvRow.length)
        //console.log(csvRow)
        let a = document.createElement("a");
        a.href= 'data:attachment/csv,'+csvString;
        a.target = "_Blank";
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click()
    }
    return (
        <div>
            <button className="form-control download" onClick={() => Download()}>
                {posts?"download as csv":"Use the template"}
                </button>
            <input className="form-control pagesize" type='number' min="10" defaultValue={10} onChange={(e)=>
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
                                <th key={head} style={{cursor:'pointer'}} onClick={() =>console.log(head)} >{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postsPerPage.filter(val =>{
                                if(search===''){
                                    return val;
                                }else if(
                                    val.id.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    val.userId.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    val.title.toLowerCase().includes(search.toLowerCase()) ||
                                    val.completed.toString().toLowerCase().includes(search.toLowerCase())
                                ){
                                    return val;
                                }
                            }).map((post, index) =>{
                                return (
                                <tr key={index}>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>
                                        <p className={post.completed ? "btn btn-success": "btn btn-danger"}>
                                            {post.completed? "Completed": "Pending"}
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
                    {/* <li className="page-link">1</li>
                    <li className="page-link">2</li> */}
                </ul>
            </nav>
        </div>
    );
};

export default DataTable;