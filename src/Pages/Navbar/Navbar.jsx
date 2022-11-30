import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import "./navbar.css";
const Navbar = () => {
  const navi = useNavigate();
  const c = useContext(Context);
  const { settoken_cookie, token_cookie } = c;
  return (
    <>
      <div className="main_navbar_container">
        <div className="barand_name">
          <p
            onClick={() => {
              navi("/");
            }}
          >
            Share Image
          </p>
        </div>
        <div className="nav_links">
          <p
            onClick={() => {
              navi("/upload");
            }}
          >
            Upload &#10010;
          </p>
          {token_cookie !== "null" || !token_cookie  ? (
            <button
              onClick={() => {
                const logout = (document.cookie = `token=${null}`);
                settoken_cookie(logout);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navi("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
