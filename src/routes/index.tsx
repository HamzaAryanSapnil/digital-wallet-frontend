import { withAuth } from "../utils/withAuth";
import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard.Layout";
import About from "@/pages/About/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import Home from "@/pages/Home/Home";
import { generateRoutes } from "@/utils/generateRoutes";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./admin.sidebar";
import { userSidebarItems } from "./user.sidebar.items";
import { agentSidebarItems } from "./agentSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Contact from "@/pages/Contact";
import FAQPage from "@/pages/Faq";
import FeaturesPage from "@/pages/Features";
import ChangePassword from "@/pages/Profile/ChangePassword";
import NotFound from "@/components/NotFound";
import RouteErrorPage from "@/components/ErrorRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "faq",
        Component: FAQPage,
      },
      {
        path: "features",
        Component: FeaturesPage,
      },
      { path: "*", Component: NotFound },
    ],
  },

  {
    Component: Login,
    path: "/login",
    errorElement: <RouteErrorPage />,
  },
  {
    Component: Register,
    path: "/register",
    errorElement: <RouteErrorPage />,
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
    errorElement: <RouteErrorPage />,
  },
  {
    Component: ChangePassword,
    path: "/change-password",
    errorElement: <RouteErrorPage />,
  },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
      { path: "*", Component: NotFound },
    ],
  },

  {
    path: "/agent",
    Component: withAuth(DashboardLayout, role.AGENT as TRole),
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <Navigate to="/agent/overview" /> },
      ...generateRoutes(agentSidebarItems),
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.USER as TRole),
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <Navigate to="/user/overview" /> },
      ...generateRoutes(userSidebarItems),
      { path: "*", Component: NotFound },
    ],
  },

  { path: "*", Component: NotFound },
]);
