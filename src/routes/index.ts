import App from "@/App";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Home from "@/pages/Home/Home";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  // {
  //   Component: Verify,
  //   path: "/verify",
  // },

  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      //   {
      //     path: "admin",
      //     Component: AdminOverview,
      //   },
    ],
  },
]);
