import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'   
import About from "./component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useState } from "react";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar head = "Note buddy" />
        <Alert alert ={alert} />
        <div className="container my-3">
          <Routes>

            
            <Route path="/" index element={<Home showAlert={showAlert} />} />
            <Route path="/home"  element={<Home showAlert={showAlert} />} />
           
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
