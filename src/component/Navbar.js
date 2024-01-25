import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation ,useNavigate} from 'react-router-dom';




const Navbar = (props) => {
  let location = useLocation();
  let Navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    Navigate("/login")
  }

  return (
    
    <>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor : " #e3f2fd"}}>
  <div className="container-fluid ">
    <Link className="navbar-brand " to="/" style={{fontFamily:"cursive"}}>{props.head}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse  " id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/home" ? "active " : ""}`} aria-current="page" to="/home">Home</Link>
        </li>
       
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active " : ""}`} to="/about">About</Link>
        </li>
        
      
      </ul>
     
    </div>
   
      {!localStorage.getItem('token')?<form action="" className="d-flex">
      <Link className="btn btn-primary mx-2" to= "/login" role="button">Login</Link>
      <Link className="btn btn-primary " to= "/signup" role="button">Sign Up</Link>
      </form> : <button onClick={handleLogout} className='btn btn-primary'   > Log out</button>}
  </div>
</nav>
    </>
  )
}

export default Navbar
