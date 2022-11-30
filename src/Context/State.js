import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import URL from '../Pages/URL'
import Context from './Context'
const State = (props) => {
  const [page, setpage] = useState(1);
  const [token_cookie, settoken_cookie] = useState("");
  const [User, setuser] = useState()
  const user = async () => {
    let url = `${URL}/get/user`
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: token_cookie
      }
    });
    let res = await data.json();
    if(!res.error){
      setuser(res);
    }
  }
  const [alert, setalert] = useState({
    display: "hide",
    msg: ""
  })
  const SetCookie = () => {
    const cookie = document.cookie.split(";");
    const token = cookie.filter((cookies) => {
      return cookies.includes("token");
    })
    const usertoken = token.join("=").split("=")[1];
    settoken_cookie(usertoken);
  }
  useEffect(() => {
    SetCookie();
    if (token_cookie !== "null") {
      user();
    }
     // eslint-disable-next-line 
  }, [token_cookie]);
  return (
    <Context.Provider value={{ token_cookie, settoken_cookie, alert, setalert, User, page, setpage }}>
      {props.children}
    </Context.Provider>
  )
}

export default State