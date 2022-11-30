import React from "react";
import ImageHolder from "../Image/ImageHolder";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Upload from "../Upload/Upload";
import ForgotPass from "../Forgotpass/ForgotPass";
import Resetpassword from "../Resetpassword/Resetpassword";
import Alert from "../Alert/Alert";
const Home = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Alert/>
        <Routes>
          <Route path="/" element={<ImageHolder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/forgot/password" element={<ForgotPass />} />
          <Route path="/reset/password/:token" element={<Resetpassword />} />
        </Routes>
      </Router>
    </>
  );
};

export default Home;
