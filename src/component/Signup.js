import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [cred, setCred] = useState({name:"" , email : "" , password : "" ,cpassword : ""});
    const navigate = useNavigate();



  const handlesubmit = async (e) => {
    e.preventDefault();
    const {name , password ,email} = cred;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email , password }),
    });


    const json = await response.json();
console.log(json);

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("successfully sign up" , "success")
    } else {
      props.showAlert("invalid cred" , "danger")
    }
  };
  const onchange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="container w-50 p-3 ">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            onChange={onchange}
            aria-describedby="emailHelp"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="cpassword"
            name="cpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
