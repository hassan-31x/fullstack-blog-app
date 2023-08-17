import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from "../components/Menu.js";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";
import moment from "moment";
// import ReactMarkdown from "react-markdown"

import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";

const Post = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split("/")[2]; // or use post.id from data received
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    console.log(html);
    console.log(doc.body.textContent);
    return doc.body.textContent;
  };

  return (
    <div className="flex gap-[50px] mt-10 flex-col lg:flex-row max-w-[1300px] w-[90vw]">
      <div className="flex-[5] flex flex-col gap-4 border-r border-r-gray-500">
        <div className="content">
          <img
            src={post.img && `http://localhost:8000/uploads/${post.img}`}
            alt="Cover Photo"
            className="w-full h-96 object-contain mb-5 lg:mb-10"
          />
        </div>

        <div className="flex items-center gap-4">
          {post?.userImg ? (
            <img
              src={post.userImg}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          ) : (
            <div className="font-medium bg-green-400 rounded-full w-10 h-10 flex justify-center items-center">
              {currentUser?.username.slice(0, 2).toUpperCase() || "MK"}
            </div>
          )}
          <div className="info text-sm">
            <span className="font-bold leading-3">{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit flex- flex-col gap-2">
              {/* Use images for both */}
              {/* State is like Props but for links */}
              <Link to={`/write?edit=${postId}`} state={post}>
                <FaPencilAlt />
              </Link>
              <span onClick={handleDelete}>
                <ImBin2 />
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-8">
          <h2 className="text-4xl font-semibold text-secondaryBlack">
            {post?.title}
          </h2>
          {/* <div className='text-black text-lg text-justify leading-7'>{getText(post?.content)}</div> */}
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
        </div>
      </div>
      <div className="flex-[2]">
        <Menu cat={post.cat} id={post.id} />
      </div>
    </div>
  );
};

export default Post;
