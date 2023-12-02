
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const Editmystudent = () =>{
    const {id} = useParams();

    let[studentname, pickName] = useState("");
    let[studentclass, pickclass] = useState("");
    let[studentmarks, pickmarks] = useState("");

    const getiteminfo = () =>{
        let url = "http://localhost:1111/itemlist/"+id;
        fetch(url)
        .then(response=>response.json())
        .then(iteminfo=>{
            pickName(iteminfo.itemname);
            pickclass(iteminfo.itemprice);
            pickmarks(iteminfo.itemdetails);
        })
    }

    useEffect(()=>{
        getiteminfo();
    },[1]);


    const save = () =>{
       let url = "http://localhost:1111/itemlist";
        let newitem = {
            "name": studentname,
            "price": studentclass,
            "details": studentmarks,
            "itemid": id
        };

        let postdata = {
            headers:{'Content-Type':'Application/json'},
            method:"PUT",
            body:JSON.stringify(newitem)
        }
        if(newitem.name !="" && newitem.price !="" && newitem.details !="")
        {
            fetch(url, postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                swal(studentname, iteminfo.msg, "success");
                window.location.href="../#";
            })
        }else {
            swal("Invalid Input", "Please Enter Values", "warning");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <form>
                        <h3 className="text-center mb-3"> Edit student Details </h3>
                        <div className="mb-4">
                            <label> Enter student Name </label>
                            <input type="text" className="form-control"
                            onChange={obj=>pickName(obj.target.value)}
                            value={studentname}/>
                        </div>

                        <div className="mb-4">
                            <label> Enter student class </label>
                            <input type="number" className="form-control"
                            onChange={obj=>pickclass(obj.target.value)}
                            value={studentclass}/>
                        </div>
                        <div className="mb-4">
                            <label> Enter student marks </label>
                            <input className="form-control"
                            onChange={obj=>pickmarks(obj.target.value)}
                            value={studentmarks}/>
                        </div>
                        <div className="text-center">
                            <button type="button" 
                                className="btn btn-info me-3" 
                                onClick={save}> Update student
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Editmystudent;