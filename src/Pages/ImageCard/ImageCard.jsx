import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Context from "../../Context/Context";
import "./ImageCard.css";
const ImageCard = (props) => {
  const c = useContext(Context);
  const { setpage, page } = c;
  const [comment_box, setCommentbox] = useState("comment_box_hide");
  useEffect(() => {
    const card = document.querySelectorAll(".main_image_container");
    const obs = new IntersectionObserver(
      (ele) => {
        ele.forEach((e) => {
          if (e.isIntersecting) {
            setpage(page + 1);
            obs.unobserve(e.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );
    obs.observe(card[card.length - 1]);
     // eslint-disable-next-line 
  }, []);
  return (
    <>
      <div className="main_image_container">
        <div className="image_container">
          <img src={props.img} alt="" loading="lazy" />
          <div className="imageInfo">
            <h3>Uploaded by-: {props.uploader}</h3>
          </div>
        </div>
        <div className="options">
          {/* Like btns*/}
          <p className="options_content">
            {props.include ? (
              <i
                className="fa-solid fa-heart"
                onClick={(e) => {
                  props.dislike();
                  e.target.classList = "fa-regular fa-heart";
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart"
                onClick={(e) => {
                  props.like();
                  e.target.classList = "fa-solid a-heart";
                }}
              ></i>
            )}
          </p>
          {/* Comment Logo and Comment box toggle */}
          <p
            className="options_content"
            onClick={() => {
              if (comment_box === "comment_box_hide") {
                setCommentbox("comment_box_show");
              } else {
                setCommentbox("comment_box_hide");
              }
            }}
          >
            <span className="unliked">
              <i
                className={`${
                  comment_box === "comment_box_hide"
                    ? "fa-regular fa-comment"
                    : "fa-solid fa-comment"
                }`}
              ></i>
            </span>
          </p>
          <p className="options_content">
            <span className="unliked">
              {props.owner ? (
                <i className="fa-solid fa-trash" onClick={props.delete}></i>
              ) : (
                ""
              )}
            </span>
          </p>
        </div>
        {/* Comment box */}
        <div className={comment_box}>
          <div className="heading">
            <p>Add Comment</p>
          </div>
          <textarea
            name="comment"
            id="comment"
            cols="40"
            rows="10"
            value={props.value}
            onChange={props.comment_value}
          ></textarea>
          <div className="comment_buttons">
            <button
              className="btn"
              onClick={() => {
                setTimeout(() => {
                  setCommentbox("comment_box_hide");
                }, 200);
                props.addComment();
              }}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
