
import AgentCashIn from "@/pages/Dashboard/Agent/Agent.Cash.In";
import AgentCashOut from "@/pages/Dashboard/Agent/Agent.Cash.Out";
import AgentOverview from "@/pages/Dashboard/Agent/AgentOverview";
import AllAgentTransactions from "@/pages/Dashboard/Agent/AllAgentTransactions";
import AllCommission from "@/pages/Dashboard/Agent/AllCommission";
import Profile from "@/pages/Profile/Profile";
import type { ISidebarItem } from "@/types";
import { IconTransactionBitcoin } from "@tabler/icons-react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agents Dashboard",
    icon: IconTransactionBitcoin,
    isActive: true,
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/agent/me",
        component: Profile,
      },
      {
        title: "Cash In/Out Overview",
        url: "/agent/overview",
        component: AgentOverview,
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
        title: "Cash In/Add Money",
        url: "/agent/cash-in",
        component: AgentCashIn,
      },
      {
        title: "Cash Out/Withdraw Money",
        url: "/agent/cash-out",
        component: AgentCashOut,
      },
      {
        title: "Commission History",
        url: "/agent/all-commissions",
        component: AllCommission,
      },
      {
        title: "Agent All Transactions",
        url: "/agent/all-transactions",
        component: AllAgentTransactions,
      },
    ],
  },
];
