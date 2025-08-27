
import UserTransactionHistory from "@/pages/Dashboard/User/Transaction.history";
import UserSendMoney from "@/pages/Dashboard/User/User.send.money";
import UserWithDrawMoney from "@/pages/Dashboard/User/User.Withdraw";
import UserOverview from "@/pages/Dashboard/User/UserOverview";
import Profile from "@/pages/Profile/Profile";
import type { ISidebarItem } from "@/types";
import { LayoutDashboard } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    icon: LayoutDashboard,
    isActive: false,
    url: "#",
    items: [
      {
        title: "User Overview",
        url: "/user/overview",
        component: UserOverview,
      },
      {
        title: "User Profile",
        url: "/user/me",
        component: Profile,
      },
    ],
  },
  {
    title: "Transactions",
    icon: LayoutDashboard,
    isActive: false,
    url: "#",
    items: [
      {
        title: "Send Money",
        url: "/user/send-money",
        component: UserSendMoney,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw",
        component: UserWithDrawMoney,
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: UserTransactionHistory,
      },
    ],
  },
];
