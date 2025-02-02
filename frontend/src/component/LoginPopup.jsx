import React, {useContext, useState } from "react";
import { Context } from "../Context/Context";
import {toast} from 'react-toastify'
import axios from 'axios'
const LoginPopup = ({ showPopup, setShowPopup }) => {
  const[loginView,setLoginView]=useState(false);
  const [data,setData]=useState({
    "name":"",
    "email":"",
    "password":""
  });
  const {url,setToken}=useContext(Context);
  const handleClosePopup = () => setShowPopup(false);

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((data)=>({...data,[name]:value}));
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newUrl=loginView? `${url}/api/user/login`:`${url}/api/user/register`
    try{
   
      const response= await axios.post(newUrl,data);
      if(response.data.success){
        console.log(response.data.message)
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        toast.success(response.data.message)
        
        setData({
          name:"",
          email:"",
          password:""
        })
        setShowPopup(false);
      }
      else{
        toast.error(response.data.message)
      }
    }catch(err){
      console.log(err)
      toast.error(response.data.message)
    }
  
  }
  
  return (
    <div>
      {/* Popup Modal */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            className="card p-4"
            style={{
              maxWidth: "400px",
              width: "90%",
              position: "relative",
              borderRadius: "10px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="btn btn-light position-absolute top-0 end-0 mt-2 me-2"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="text-center mb-3">{loginView?"Log In":"Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!loginView && 
              // name
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e)=>onChangeHandler(e)}
                  placeholder="Enter your name"
                  required
                />
              </div>}
              {/* email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={(e)=>onChangeHandler(e)}
                  required
                />
              </div>
              {/* password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={(e)=>onChangeHandler(e)}
                  required
                />
              </div>

              {/* Checkbox */}
             {!loginView &&  <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  required
                />
                <label htmlFor="terms" className="form-check-label">
                  By continuing, I agree to the{" "}
                  <a href="#" className="text-danger text-decoration-none">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-danger text-decoration-none">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>}

              <button
                type="submit"
                className="btn btn-danger w-100"
                style={{ fontSize: "1rem", padding: "10px" }}
              >
                {loginView?"Log In":"Create Account"}
              </button>
            </form>

            {/* Already have an account */}
            <div className="text-center mt-3">
              <p>
                {!loginView?"Already have an account? ":"Create a new account? "}

                {!loginView? 
                <a href="#" className="text-danger text-decoration-none"
                onClick={()=>setLoginView(true)}>
                  Log in
                </a>
                :
                <a href="#" className="text-danger text-decoration-none"
                onClick={()=>setLoginView(false)}>
                 Click here
                </a> 
                }
                
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
