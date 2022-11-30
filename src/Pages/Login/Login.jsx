import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignUp/SignUp.css";
import Context from "../../Context/Context";
import URL from "../URL";
const Login = () => {
  const c = useContext(Context);
  const {  setalert } = c;
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  const SetData = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const Login = async (e) => {
    if (!userData.username || !userData.password) {
      return setalert({
        display: "display",
        msg: "Details cannot be empty",
      });
    } else {
      try {
        e.target.textContent = "Loading...";
        let url = `${URL}/login`;
        let data = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            password: userData.password,
          }),
        });
        let res = await data.json();
        if (res.sign) {
          e.target.textContent = "Login";
          document.cookie = `token=${res.sign}`;
          setalert({
            display: "display",
            msg: "Logged in",
          });
          setTimeout(() => {
            navi("/");
          }, 300);
        } else if (res.error) {
          e.target.textContent = "Login";
          setalert({
            display: "display",
            msg: res.error,
          });
        }
      } catch (error) {
        if(error){
          e.target.textContent = "Login";
          setalert({
            display:"display",
            msg:"Something went wrong"
          })
        }
      }
    }
  };
  const navi = useNavigate();
  return (
    <>
      <div className="main_signup_container">
        <div className="msg">
          <h1>Login to continue</h1>
        </div>
        <br />
        <div className="inputs">
          <div className="input_box">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              value={userData.username}
              name="username"
              onChange={SetData}
            />
          </div>
          <div className="input_box">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              value={userData.password}
              name="password"
              onChange={SetData}
            />
          </div>
        </div>
        <div className="buttons">
          <button className="btn" onClick={Login}>
            Login
          </button>
        </div>
        <div className="already_have_account">
          <p
            onClick={() => {
              navi("/signup");
            }}
          >
            Don't have an account?
          </p>
          <br />
          <p
            onClick={() => {
              navi("/forgot/password");
            }}
          >
            Forget password
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
