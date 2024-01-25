import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [cred, setCred] = useState({email : "" , password : ""});
    const port = 'https://inotebook-backend-4nxo.onrender.com'
    const navigate = useNavigate();

    const handlesubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${port}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({ email : cred.email , password : cred.password}),
       
      });
      const json = await response.json();
      
      if (json.success) {
        // save the aith token
        console.log(json.authToken);
        localStorage.setItem('token', json.authToken);
        props.showAlert("successfully logged" , "success")
        navigate('/')

      }
      else{
        props.showAlert("invalid cred" , "danger")
      }
    }
    const onchange = (e)=>{
        setCred({...cred , [e.target.name] : e.target.value})
        }
  return (
    <div className="container mt-3 w-50 p-3 ">
      <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={cred.email} onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={cred.password} onChange={onchange} />
  </div>
 <div className="container text-center">
  <button type="submit" className="btn btn-primary ">Submit</button></div>
</form>
    </div>
    
  );
}

export default Login;
