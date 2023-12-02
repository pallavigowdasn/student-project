import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Allstudent from "./studentlist";
import Mynewstudent from "./newstudent";

import Editmystudent from "./editstudent";

function App() {
  return (
    <HashRouter>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-lg-9 text-primary">
              <h1 className="text-center"> class screen and student screen</h1>
          </div>
          <div className="col-lg-3 text-end">
              <div className="btn-group">
                <Link to="/" className="btn btn-primary"> student List </Link>
                <Link to="/newitem" className="btn btn-warning"> add marks </Link>
              </div>
          </div>
          </div>
      </div>

      <Routes>
        <Route exact path="/" element={<Allstudent/>} />
        <Route exact path="/newitem" element={<Mynewstudent/>} />
        <Route exact path="/edititem/:id" element={<Editmystudent/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
