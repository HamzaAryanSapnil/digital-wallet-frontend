import AllTransactions from "@/pages/Dashboard/Admin/AllTransactions";
import type { ISidebarItem } from "@/types";
import { LayoutDashboard } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Transactions",
    icon: LayoutDashboard,
    isActive: false,
    url: "#",
    items: [
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: AllTransactions,
      },
    ],
  },
];
