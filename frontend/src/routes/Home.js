import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Top from "../components/Top.js";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [homepage, setHomepage] = useState(false);

  const location = useLocation();
  const cat = location.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="mt-9 w-full z-10 max-w-[1300px]">
      {homepage && <Top />}
      <div className="flex">
        <div className="flex flex-col gap-10 flex-[7] border-r-[1px] border-r-gray-200">
          {posts.map((post) => (
            <div className="py-4 px-6 border-b border-opacity-60">
              {post.cat && (
                <span className="text-white bg-black rounded-full capitalize text-xs px-2 mr-2">
                  {post.cat}
                </span>
              )}
              <span className="text-xs font-semibold opacity-90">{`${Math.ceil(
                post.content.trim().split(/\s+/).length / 225
              )} min to read`}</span>
              <div className="flex gap-10 flex-row-reverse h-40" key={post.id}>
                <div className="flex-[1] relative">
                  {post.img && (
                    <img
                      src={require("../uploads/" + post.img)}
                      alt="img"
                      className="h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1"; // Set the default image on error
                        e.target.onerror = null; // Prevent infinite loop
                      }}
                    />
                  )}
                  {/* <img
                    src={require("../uploads/" + post.img)} // Use the image URL directly
                    onError={(e) => {
                      e.target.src = placeholderImage; // Set the default image on error
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                    alt=""
                  /> */}
                </div>
                <div className="flex-[3] flex flex-col relative">
                  <h2 className="text-3xl font-semibold py-3">{post.title}</h2>
                  <div
                    class="text-lg font-regular"
                    dangerouslySetInnerHTML={{
                      __html:
                        post?.content.length > 100
                          ? post.content.slice(0, 100) + "..."
                          : post.content,
                    }}
                  ></div>
                  <Link className="absolute bottom-1" to={`post/${post.id}`}>
                    <button className="w-max underline text-darkSecondary hover:text-black hover:bg-lightOrange delay-100 rounded-md hover:text-darkOrange hover:border-lightOrange">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Sidebar />
      </div>
    </div>
  );
};

const sidebarItems = [
  // { cat: "/" },
  { cat: "personal" },
  { cat: "humour" },
  { cat: "relationship" },
  { cat: "mystery" },
  { cat: "fantasy" },
  { cat: "confession" },
];

const Sidebar = () => {
  return (
    <div className="flex-[4] sticky top-0 max-w-[1300px] w-[90vw]">
      <div className="flex flex-col pt-4">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            className="nav-item no-underline color-inherit font-regular text-md uppercase border border-gray-500 py-3 px-4 rounded-lg my-1 mx-2 w-max ml-auto hover:bg-gray-100 delay-75 duration-100"
            to={`/?cat=${item.cat}`}
          >
            {item.cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
