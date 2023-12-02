
import { useState } from "react";
import swal from "sweetalert";

const Mynewstudent = () =>{
    let[studentname, pickName] = useState("");
    let[studentclass, pickclass] = useState("");
    let[studentmarks, pickmarks] = useState("");

    const save = () =>{
       let url = "http://localhost:1111/itemlist";
        let newitem = {
            "name": studentname,
            "price": studentclass,
            "details": studentmarks
        };
        let postdata = {
            headers:{'Content-Type':'Application/json'},
            method:"POST",
            body:JSON.stringify(newitem)
        }
        if(newitem.name !="" && newitem.price !="" && newitem.details !="")
        {
            fetch(url, postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                swal(studentname, "Save Successfully", "success");
                pickName(""); pickclass(""); pickmarks("");
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
                        <h3 className="text-center mb-3"> Enter Student Details </h3>
                        <div className="mb-4">
                            <label> Enter student Name </label>
                            <input type="text" className="form-control"
                            onChange={obj=>pickName(obj.target.value)}
                            value={studentname}/>
                        </div>

                        <div className="mb-4">
                            <label> Enter student class  </label>
                            <input type="number" className="form-control"
                            onChange={obj=>pickclass(obj.target.value)}
                            value={studentclass}/>
                        </div>
                        <div className="mb-4">
                            <label> Enter student marks </label>
                            <input type="number" className="form-control"
                            onChange={obj=>pickmarks(obj.target.value)}
                            value={studentmarks}/>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn btn-info me-3" onClick={save}> Save student </button>
                            <button type="reset" className="btn btn-danger"> Clear All </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Mynewstudent;