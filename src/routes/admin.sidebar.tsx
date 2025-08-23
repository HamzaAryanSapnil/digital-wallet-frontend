import AllTransactions from "@/pages/Dashboard/Admin/AllTransactions";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import Analytics from "@/pages/Dashboard/Admin/Analytics";
import type { ISidebarItem } from "@/types";
import { IconTransactionBitcoin } from "@tabler/icons-react";
import { LayoutDashboard, User } from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    isActive: false,
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics
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
        component: AllUsers
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
        component: AllTransactions
      },
    ],
  },
];