
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from 'react-router-dom';

const Allstudent = () =>{
    let[mystudent, updatestudent] = useState([]);
    const getItem = () =>{
        
        fetch("http://localhost:1111/itemlist")
        .then(response=>response.json())
        .then(itemArray=>{
            updatestudent(itemArray);
        })
    }

    useEffect(()=>{
        getItem();
    },[1]);

    const deleteItem = (id) =>{
       let url = "http://localhost:1111/itemlist/"+id;
       let postdata = { method:"delete" };
       fetch(url, postdata)
       .then(response=>response.json())
       .then(serverinfo=>{
            swal("Deleted", serverinfo.msg, "success");
            getItem();
       })
    }

    let[keyword, updateKeyword] = useState("");
    const searchItem = () =>{
        let url = "http://localhost:1111/searchapi";
        let newitem = {
            "mykeyword": keyword
        };

        let postdata = {
            headers:{'Content-Type':'Application/json'},
            method:"POST",
            body:JSON.stringify(newitem)
        }
        if(newitem.mykeyword !="")
        {
            fetch(url, postdata)
            .then(response=>response.json())
            .then(itemarray=>{
                updatestudent(itemarray);
            })
        }else {
            swal("Invalid Request", "Please Enter Search Keyword", "warning");
        }
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4 mb-5">
                    <h3 className="text-center"> student  details  </h3>
                </div>
                <div className="col-lg-8 mb-5">
                   <table className="table-bordered" cellPadding="15" cellSpacing="15">
                    <thead>
                       <tr>
                        <th>Sl NO</th>
                        <th>student class</th>
                        <th>list of details in that claas</th>
                       </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1 st class</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2 st class</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3 st class</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                   </table>
                    
                </div>
                {
                    mystudent.map((item, index)=>{
                        return(
                            <div className="mb-4 col-lg-3" key={index}>
                                <div className="p-3 border rounded">
                                    <h4> student name:{item.itemname} </h4>
                                    <p> student class: {item.itemprice} </p>
                                    <p> student marks:{item.itemdetails} </p>
                                    <p className="text-center">
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={deleteItem.bind(this, item._id)}> 
                                            Delete marks
                                        </button>
                                        <Link 
                                        className="btn btn-warning btn-sm ms-2"
                                        to={`/edititem/${item._id}`}> Edit marks</Link>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Allstudent;