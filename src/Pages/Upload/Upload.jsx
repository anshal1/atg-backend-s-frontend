import React from "react";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import "./Upload.css";
import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import Context from "../../Context/Context";
import URL from "../URL";
const Upload = () => {
  const c = useContext(Context);
  const { setalert, token_cookie } = c;
  const navi = useNavigate()
  // For compressing image
  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
    maxWidthOrHeight: 576,
  };

  //  for frontend
  const [file, setfile] = useState();
  const [upload_file, setupload_file] = useState();
  const [loading_image, setloading_image] = useState(false);
  const Showpreview = async (e) => {
    if (e.target.files[0]) {
      setloading_image(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setfile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    try {
      const compressedFile = await imageCompression(e.target.files[0], options);
      setupload_file(compressedFile);
      if (compressedFile) {
        setloading_image(false);
      }
    } catch (error) {
      if (error) {
      }
    }
  };
  const UploadImage = (event) => {
    if (!upload_file) {
      return setalert({
        display: "display",
        msg: "No image to upload",
      });
    } else if (!token_cookie) {
      setalert({
        display: "display",
        mag: "Please login or create an account first to upload images",
      });
    } else {
      let url = `${URL}/share/image`;
      const formData = new FormData();
      formData.append("image", upload_file);
      const req = new XMLHttpRequest();
      req.upload.onprogress = (e) => {
        setalert({
          display: "display",
          msg: "Uploading Please wait...",
        });
        if (Math.round((e.loaded / e.total) * 100) === 100) {
          event.target.textContent = "Finishing Up";
        } else {
          
          event.target.textContent = `${Math.round(
            (e.loaded / e.total) * 100
          )}% Uploaded`;
        }
      };
      req.addEventListener("error", ()=>{
        setalert({
          display:"display",
          msg:"Something went wrong"
        })
      })
      req.addEventListener("abort", ()=>{
        setalert({
          display:"",
          msg:"Upload canceled by user"
        })
      })
      req.addEventListener("load", () => {
        if (req.response) {
          setalert({
            display: "display",
            msg: "Image Uploaded",
          });
          event.target.textContent = "Uploaded";
          setTimeout(()=>{
            navi("/");
          }, 300)
        }
      });
      req.open("POST", url);
      req.setRequestHeader("token", token_cookie);
      req.send(formData);
    }
  };
  return (
    <>
      <div className="main_upload_container">
        <h2 style={{ textAlign: "center" }}>
          <span id="share">Upload</span> <span id="my">Image</span>{" "}
          <span id="image">Here</span>
        </h2>
        <br />
        <div className="image_preview">
          <img src={file} alt="" id="preview" />
          {loading_image ? (
            <div className="image_loading">
              <h2>Loading Image...</h2>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="button">
          <input type="file" onChange={Showpreview} />
          {loading_image ? (
            <p>Please wait..</p>
          ) : (
            <button onClick={UploadImage}>Upload</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
