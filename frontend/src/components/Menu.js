import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = ({ cat, id }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data.length > 4 ? res.data.slice(0, 4) : res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div>
      <h2 className="text-2xl text-secondaryBlack font-bold opacity-[95%] mb-5">
        Other posts you may like..
      </h2>
      <div className="flex flex-row flex-wrap lg:flex-col gap-6">
        {posts.map((post) => {
          if (post.id != id) {
            return (
              // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              <div
                key={post.id}
                className="flex flex-col gap-2 rounded-md hover:drop-shadow-[5px_7px_29px_rgba(100,100,111,0.2)]  delay-200 py-3 px-4"
              >
                <img
                  src={post.img && `http://localhost:8000/uploads/${post.img}`}
                  alt="img"
                  className="border border-black w-full h-48 object-cover rounded-lg drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] mb-4"
                />
                <h3 className="text-xl font-bold text-secondaryBlack opacity-[95%]">
                  {post.title}
                </h3>
                {/* without '/' at start will add that to exiting URL instead of absolute URL from start */}
                <Link to={`/post/${post.id}`}>
                  <button className="w-max border-b border-b-darkSecondary text-darkSecondary hover:text-black text-sm hover:bg-lightOrange delay-100 rounded-sm hover:text-darkOrange hover:border-b-black hover:border-lightOrange">
                    Read More
                  </button>
                </Link>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Menu;
