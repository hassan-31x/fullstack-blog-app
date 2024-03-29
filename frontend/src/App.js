import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./routes/Home.js";
import Post from "./routes/Post.js";
import Write from "./routes/Write.js";
import Login from "./routes/Login.js";
import Register from "./routes/Register.js";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app flex justify-center bg-lightPrimary  min-h-screen">
      <div className="w-screen items-center flex flex-col">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
