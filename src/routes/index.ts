import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard.Layout";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

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
    path: "/admin",
    Component: DashboardLayout,
    children: [
        {
          path: "admin",
          Component: AdminOverview,
        },
    ],
  },
]);
