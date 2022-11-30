import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import URL from "../URL";
import "./SignUp.css";
const SignUp = () => {
  const c = useContext(Context);
  const {setalert} = c;
  const [userData, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const SetData = (e) => {
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  };
  const navi = useNavigate();
  const SignUp = async(e)=>{
    if(!userData.username || !userData.email || !userData.password){
     return setalert({
        display:"display",
        msg:"Details cannot be blank"
      })
    } else {
      try {
        e.target.textContent = "Loading..."
        let url = `${URL}/signup`;
        let data = await fetch(url, {
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({username: userData.username, email: userData.email, password: userData.password})
        });
        let res = await data.json();
        if(res.sign){
          e.target.textContent = "SignUp"
          setalert({
            display:"display",
            msg: "Account created"
          })
          document.cookie = `token=${res.sign}`;
          setTimeout(()=>{
            navi("/");
          }, 300)
        } else if(res.error){
          setalert({
            display:"display",
            msg: res.error
          })
          e.target.textContent = "SignUp"
        }
      } catch (error) {
        if(error){
          setalert({
            display:"display",
            msg:"Something went wrong"
          })
        }
      }
    }
  }
  return (
    <>
      <div className="main_signup_container">
        <div className="msg">
          <h1>Signup to continue</h1>
        </div>
        <br />
        <div className="inputs">
          <div className="input_box">
            <label htmlFor="name">Username</label>
            <input type="text" name="username" onChange={SetData} value={userData.username} />
          </div>
          <div className="input_box">
            <label htmlFor="name">Email</label>
            <input type="email" name="email" onChange={SetData} value={userData.email} />
          </div>
          <div className="input_box">
            <label htmlFor="name">Password</label>
            <input type="password" name="password" onChange={SetData} value={userData.password} />
          </div>
        </div>
        <div className="buttons">
          <button className="btn" onClick={SignUp}>Sign Up</button>
        </div>
        <div className="already_have_account">
          <p
            onClick={() => {
              navi("/login");
            }}
          >
            Already have an account?
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
