import React from "react";
import { useContext } from "react";
import { useState } from "react";
import "./ForgotPass.css";
import Context from "../../Context/Context";
import URL from "../URL";
const ForgotPass = () => {
  const c = useContext(Context);
  const { setalert } = c;
  const [email, setemail] = useState("");
  const Submit = async (e) => {
    if (!email) {
      return setalert({
        display: "display",
        msg: "Email cannot be empty",
      });
    } else {
      e.target.textContent = "Loading...";
      let url = `${URL}/forgot/password`;
      let data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      let res = await data.json();
      if (res.msg) {
        setalert({
          display: "display",
          msg: res.msg,
        });
        e.target.textContent = "Submitted";
      } else if (res.error) {
        setalert({
          display: "display",
          msg: res.error,
        });
        e.target.textContent = "Submit";
      }
    }
  };
  return (
    <>
      <div className="main_forgot_pass">
        <div className="input">
          <div className="text">
            <h1>Enter the registered email</h1>
          </div>
          <div className="input_email">
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              id=""
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div className="button">
            <button onClick={Submit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
