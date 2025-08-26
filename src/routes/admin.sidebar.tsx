
import AllAgents from "@/pages/Dashboard/Admin/AllAgents";
import AllTransactions from "@/pages/Dashboard/Admin/AllTransactions";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import AllWallets from "@/pages/Dashboard/Admin/AllWallets";
import Profile from "@/pages/Profile/Profile";
// import Analytics from "@/pages/Dashboard/Admin/Analytics";
import type { ISidebarItem } from "@/types";
import { IconTransactionBitcoin } from "@tabler/icons-react";
import { LayoutDashboard, User } from "lucide-react";
import { lazy } from "react";

console.log("Analytics mounted");
const Analytics = lazy(() => import("@/pages/Dashboard/Admin/Analytics"));
export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    isActive: false,
    url: "#",
    items: [
      {
        title: "Admin Profile",
        url: "/admin/me",
        component: Profile,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "User Management",
    icon: User,
    isActive: true,
    url: "#",
    items: [
      {
        title: "Manage Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
      {
        title: "Manage Agents",
        url: "/admin/all-agents",
        component: AllAgents,
      },
    ],
  },
  {
    title: "Transactions",
    icon: IconTransactionBitcoin,
    isActive: true,
    url: "#",
    items: [
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        component: AllTransactions,
      },
    ],
  },
  {
    title: "Wallets Management",
    icon: IconTransactionBitcoin,
    isActive: true,
    url: "#",
    items: [
      {
        title: "All Wallets",
        url: "/admin/all-wallets",
        component: AllWallets,
      },
    ],
  },
];
