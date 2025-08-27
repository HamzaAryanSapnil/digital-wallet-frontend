// components/OverviewSectionCards.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { OverviewResult } from "@/types";

function fmtCurrency(v?: number) {
  if (v == null) return "৳0";
  return `৳${v.toLocaleString("en-US")}`;
}

export function OverviewSectionCards({ data }: { data?: OverviewResult }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const usersCount = data?.topCounterparties?.length ?? 0; // fallback; replace if you have totalUsers in API
  const txCount = data?.totals?.txCount ?? 0;
  const cashIn = data?.totals?.cashIn ?? 0;
  const cashOut = data?.totals?.cashOut ?? 0;
  const walletBalance = data?.walletBalance ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-sm">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {fmtCurrency(walletBalance)}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Available balance across wallet
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-sm">Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{txCount}</CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Total transactions
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-sm">Total Cash In</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-green-600">
          {fmtCurrency(cashIn)}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Sum of cash in
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-sm">Total Cash Out</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-red-600">
          {fmtCurrency(cashOut)}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Sum of cash out
        </CardFooter>
      </Card>
    </div>
  );
}
