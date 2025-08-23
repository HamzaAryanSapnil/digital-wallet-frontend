import { withAuth } from './../utils/withAuth';
import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard.Layout";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import Home from "@/pages/Home/Home";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, redirect } from "react-router";
import { adminSidebarItems } from "./admin.sidebar";
import { userSidebarItems } from "./user.sidebar.items";
import { agentSidebarItems } from "./agentSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { role } from '@/constants/role';
import type { TRole } from '@/types';

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
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    children: [
      { index: true, loader: () => redirect("/admin/analytics") },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    children: [
      { index: true, loader: () => redirect("/agent/overview") },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.USER as TRole),
    children: [
      { index: true, loader: () => redirect("/user/overview") },
      ...generateRoutes(userSidebarItems),
    ],
  },
]);
