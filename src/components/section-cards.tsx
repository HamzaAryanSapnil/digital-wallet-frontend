// components/section-cards.tsx
import * as React from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UserRow, IWallet, ITransaction } from "@/types";

type Delta = {
  value?: number;
  positive?: boolean;
};

interface SectionCardsProps {
  users?: UserRow[];
  wallets?: IWallet[]; 
  transactions?: ITransaction[]; 
  deltas?: {
    users?: Delta;
    agents?: Delta;
    transactions?: Delta;
    volume?: Delta;
  };
}

const fmtNum = (n: number) =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);

const fmtCurrency = (n: number) =>
  `৳${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const countAgents = (users?: UserRow[]) =>
  (users || []).filter((u) => u.role === "AGENT").length;

const sumVolume = (transactions?: ITransaction[]) =>
  (transactions || []).reduce((acc, t) => acc + (t?.amount || 0), 0);

export function SectionCards({
  users,
  wallets,
  transactions,
  deltas,
}: SectionCardsProps) {
  const totalUsers = users?.length ?? 0;
  const totalAgents = countAgents(users);
  const totalTransactions = transactions?.length ?? 0;
  const totalVolume = sumVolume(transactions);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Users */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fmtNum(totalUsers)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-2">
              {deltas?.users?.positive ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {typeof deltas?.users?.value === "number"
                ? `${deltas!.users!.value}%`
                : "—"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalUsers > 0 ? "Active users count" : "No users found"}
          </div>
          <div className="text-muted-foreground">
            {wallets
              ? `${wallets.length} wallets in system`
              : "Wallet data not provided"}
          </div>
        </CardFooter>
      </Card>

      {/* Agents */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Agents</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fmtNum(totalAgents)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-2">
              {deltas?.agents?.positive ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {typeof deltas?.agents?.value === "number"
                ? `${deltas!.agents!.value}%`
                : "—"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalAgents > 0 ? "Active agents" : "No agents"}
          </div>
          <div className="text-muted-foreground">
            {totalAgents > 0
              ? "Monitoring agent activity"
              : "Invite agents to onboard"}
          </div>
        </CardFooter>
      </Card>

      {/* Transaction Count */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Transaction Count</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fmtNum(totalTransactions)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-2">
              {deltas?.transactions?.positive ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {typeof deltas?.transactions?.value === "number"
                ? `${deltas!.transactions!.value}%`
                : "—"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalTransactions > 0
              ? "Volume of operations"
              : "No transactions yet"}
          </div>
          <div className="text-muted-foreground">
            {totalTransactions > 0 ? `${transactions?.length} total` : "..."}
          </div>
        </CardFooter>
      </Card>

      {/* Volume */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Volume</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalVolume ? fmtCurrency(totalVolume) : "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-2">
              {deltas?.volume?.positive ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {typeof deltas?.volume?.value === "number"
                ? `${deltas!.volume!.value}%`
                : "—"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalVolume ? "Total transaction volume" : "No volume data"}
          </div>
          <div className="text-muted-foreground">
            {totalTransactions > 0 ? `${totalTransactions} transactions` : ""}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
