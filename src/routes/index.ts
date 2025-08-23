import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard.Layout";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import Home from "@/pages/Home/Home";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./admin.sidebar";
import { userSidebarItems } from "./user.sidebar.items";
import { agentSidebarItems } from "./agentSidebarItems";

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
    children: [...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/agent",
    Component: DashboardLayout,
    children: [...generateRoutes(agentSidebarItems)],
  },
  {
    path: "/user",
    Component: DashboardLayout,
    children: [...generateRoutes(userSidebarItems)],
  },
]);
