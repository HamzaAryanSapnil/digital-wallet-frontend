
import AllCommission from "@/pages/Dashboard/Agent/AllCommission";
import type { ISidebarItem } from "@/types";
import { IconTransactionBitcoin } from "@tabler/icons-react";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Transactions",
    icon: IconTransactionBitcoin,
    isActive: true,
    url: "#",
    items: [
      {
        title: "Commission History",
        url: "/agent/all-commissions",
        component: AllCommission,
      },
    ],
  },
];
