import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageHolder.css";
import Context from "../../Context/Context";
import Loader from "../Loader/Loader";
import URL from "../URL";
const ImageHolder = () => {
  const c = useContext(Context);
  const { token_cookie, setalert, User, page } = c;
  const [nextpage, setnextPage] = useState(false);
  const [Image, setImage] = useState([]);
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(true);
  const [infinte_post_loader, setinfinite_post_loader] = useState(false);
  const Allimage = async () => {
    setinfinite_post_loader(true);
    let url = `${URL}/all/post?limit=6&page=${page}`;
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    let res = await data.json();
    if (res.post) {
      setinfinite_post_loader(false);
      setImage(Image.concat(res.post));
      setloading(false);
      setnextPage(res.isNextPage);
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
      setinfinite_post_loader(false);
      setloading(false);
    }
  };
  const Allimage_infinte = async () => {
    setinfinite_post_loader(true);
    let url = `${URL}/all/post?limit=6&page=${page}`;
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    let res = await data.json();
    if (res.post) {
      setinfinite_post_loader(false);
      setImage(Image.concat(res.post));
      setloading(false);
      setnextPage(res.isNextPage);
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
      setinfinite_post_loader(false);
      setloading(false);
    }
  };
  const Like = async (img) => {
    if (token_cookie === "null") {
      setalert({
        display: "display",
        msg: "Please login to like",
      });
      return;
    }
    let url = `${URL}/like/${img._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: token_cookie,
      },
    });
    let res = await data.json();
    if (res) {
      const Newposts = Image.map((image) => {
        if (image._id === res._id) {
          return res;
        } else {
          return image;
        }
      });
      setImage(Newposts);
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
    }
  };
  const dislike = async (img) => {
    if (token_cookie === "null") return;
    let url = `${URL}/dislike/${img._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: token_cookie,
      },
    });
    let res = await data.json();
    if (res) {
      const Newposts = Image.map((image) => {
        if (image._id === res._id) {
          return res;
        } else {
          return image;
        }
      });
      setImage(Newposts);
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
    }
  };
  const Delete = async (img) => {
    setalert({
      display: "display",
      msg: "Deleting please wait...",
    });
    let url = `${URL}/delete/post/${img._id}`;
    let data = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: token_cookie,
      },
    });
    let res = await data.json();
    if (!res.error) {
      setalert({
        display: "display",
        msg: "Deleted Successfully",
      });
      const Newposts = Image.filter((image) => {
        return image._id !== res._id;
      });
      setImage(Newposts);
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
    }
  };
  const addComment = async (img) => {
    let url = `${URL}/add/comment/${img._id}`;
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: token_cookie,
      },
      body: JSON.stringify({ comment_body: comment }),
    });
    let res = await data.json();
    if (res.add_comment) {
      setalert({
        display: "display",
        msg: "Comment added successfully",
      });
      setcomment("");
    } else if (res.error) {
      setalert({
        display: "display",
        msg: res.error,
      });
    }
  };
  const comment_value = (e) => {
    setcomment(e.target.value);
  };
  useEffect(() => {
    Allimage();
    // eslint-disable-next-line 
  }, []);
  useEffect(() => {
    if (nextpage) {
      Allimage_infinte();
    }
     // eslint-disable-next-line 
  }, [page]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_image_holder">
          <div className="image_card_conatainer">
            {Image.length < 1 ? (
              <h1>No Images Available</h1>
            ) : (
              <div className="image_card_conatiner_2">
                {Image.map((image) => {
                  return (
                    <ImageCard
                      key={image._id}
                      img={image.image}
                      uploader={image.uploaded_by}
                      include={image.likes.includes(User?.username)}
                      like={() => Like(image)}
                      dislike={() => {
                        dislike(image);
                      }}
                      owner={
                        User?.username === image.uploaded_by ? true : false
                      }
                      delete={() => {
                        Delete(image);
                      }}
                      addComment={() => {
                        addComment(image);
                      }}
                      value={comment}
                      comment_value={(e) => {
                        comment_value(e);
                      }}
                    />
                  );
                })}
                {infinte_post_loader ? (
                  <h2 id="infinte_loader">Loading...</h2>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageHolder;
