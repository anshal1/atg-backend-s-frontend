import React from "react";
import { useContext } from "react";
import { useState } from "react";
import "../Forgotpass/ForgotPass.css";
import { useLocation, useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import URL from "../URL";
import { useEffect } from "react";
const Resetpassword = () => {
  const location = useLocation();
  const navi = useNavigate()
  const c = useContext(Context);
  const { setalert } = c;
  const [password, setpassword] = useState({
    password: "",
    confirm_pass: "",
  });
  const SetPass = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    document.cookie = `token=${null}`;
  }, [])
  const ChangePass = async (e) => {
    if (!password.password || !password.confirm_pass) {
      return setalert({
        display: "display",
        msg: "Password cannot be empty",
      });
    } else if (password.password !== password.confirm_pass) {
      return setalert({
        display: "display",
        msg: "Password and Confirm password must be equal",
      });
    } else if (password.password.length < 8) {
      return setalert({
        display: "display",
        msg: "Password must be greater than 8 characters",
      });
    } else {
      e.target.textContent = "Changing Password"
      let url = `${URL}${location.pathname}`;
      let data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password: password.confirm_pass }),
      });
      let res = await data.json();
      console.log(res);
      if (res.msg) {
        setalert({
          display: "display",
          msg: res.msg,
        });
        navi("/login");
        e.target.textContent = "Password Changed"
      } else if (res.error) {
        setalert({
          display: "display",
          msg: res.error,
        });
      }
    }
  };
  return (
    <div className="main_forgot_pass">
      <div className="input">
        <div className="text">
          <h1>Reset Your Password</h1>
        </div>
        <div className="input_email">
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            id=""
            value={password.password}
            onChange={SetPass}
          />
        </div>
        <div className="input_email">
          <input
            type="password"
            name="confirm_pass"
            placeholder="Confirm your new password"
            id=""
            value={password.confirm_pass}
            onChange={SetPass}
          />
        </div>
        <div className="button">
          <button onClick={ChangePass}>Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
