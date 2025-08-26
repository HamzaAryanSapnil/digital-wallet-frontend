/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Loader from "@/components/Loader";
import { useGetTransactionsSummeryQuery } from "@/redux/features/Admin/transaction.api";

const fmtCurrency = (v: number) =>
  `৳${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const fmtNumber = (n: number) => n.toLocaleString("en-US");

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--color-transactions, var(--primary))",
  },
  volume: {
    label: "Volume (৳)",
    color: "var(--color-volume, var(--secondary))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  const {
    data: transactionSummeryData,
    isLoading: transactionSummeryDataLoading,
    isError,
  } = useGetTransactionsSummeryQuery(undefined);

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const aggregated: { date: string; transactions: number; volume: number }[] =
    React.useMemo(() => {
      if (!transactionSummeryData) return [];
      const payload: any =
        (transactionSummeryData as any).data ?? transactionSummeryData;
      if (!Array.isArray(payload)) return [];
      // ensure fields and sort by date asc
      const mapped = payload
        .map((d: any) => ({
          date: String(d.date),
          transactions: Number(d.transactions ?? 0),
          volume: Number(d.volume ?? 0),
        }))
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      return mapped;
    }, [transactionSummeryData]);

  const referenceDate = React.useMemo(() => {
    if (aggregated.length > 0)
      return new Date(
        aggregated[aggregated.length - 1].date + "T00:00:00+06:00"
      );
    return new Date();
  }, [aggregated]);

  const filteredData = React.useMemo(() => {
    if (!aggregated.length) return [];
    const days = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;
    const start = new Date(referenceDate);
    start.setDate(start.getDate() - days + 1); // include the reference date itself
    return aggregated.filter((row) => {
      const dt = new Date(row.date + "T00:00:00+06:00");
      return dt >= start && dt <= referenceDate;
    });
  }, [aggregated, timeRange, referenceDate]);

  const totals = React.useMemo(() => {
    const totalTransactions = filteredData.reduce(
      (s, r) => s + (r.transactions || 0),
      0
    );
    const totalVolume = filteredData.reduce((s, r) => s + (r.volume || 0), 0);
    return { totalTransactions, totalVolume };
  }, [filteredData]);

  const scaledChartData = React.useMemo(() => {
    const maxVolume = Math.max(0, ...filteredData.map((d) => d.volume));
    const volumeScale = maxVolume > 1_000_000 ? 1000 : 1;
    return filteredData.map((d) => ({
      date: d.date,
      transactions: d.transactions,
      scaledVolume: volumeScale === 1 ? d.volume : d.volume / volumeScale,
      _volumeRaw: d.volume,
      _volumeScale: volumeScale,
    }));
  }, [filteredData]);

  if (transactionSummeryDataLoading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Transactions & Volume</CardTitle>
          <CardDescription>Loading summary…</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <Loader />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4 w-full">
          <div className="flex-1">
            <CardTitle>Transactions & Volume</CardTitle>
            <CardDescription>
              <span className="hidden @[540px]/card:block">
                Daily transaction count and total volume for the selected range
              </span>
              <span className="@[540px]/card:hidden">
                Transactions & Volume
              </span>
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(v) => v && setTimeRange(v as any)}
              variant="outline"
              className="hidden @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
              <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            </ToggleGroup>

            <Select
              value={timeRange}
              onValueChange={(v) => setTimeRange(v as any)}
            >
              <SelectTrigger
                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a range"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-3 sm:px-6 sm:pt-4">
        {/* Top summary row */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Total Transactions
              </span>
              <span className="text-lg font-semibold">
                {fmtNumber(totals.totalTransactions)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                Total Volume
              </span>
              <span className="text-lg font-semibold">
                {fmtCurrency(totals.totalVolume)}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredData.length
              ? `${filteredData.length} day(s)`
              : "No data for selected range"}
          </div>
        </div>

        {/* Chart or empty */}
        {scaledChartData.length === 0 ? (
          <div className="min-h-[220px] flex items-center justify-center text-muted-foreground">
            {isError
              ? "Failed to load data."
              : "No aggregated data for the selected range."}
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full">
            {/* Use numeric height on ResponsiveContainer for stable layout */}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={scaledChartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillTrans" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-1)"
                      stopOpacity={0.15}
                    />
                  </linearGradient>
                  <linearGradient id="fillVol" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.15}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="var(--color-chart-grid)"
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={false}
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={{
                    stroke: "var(--color-chart-axis)",
                    strokeWidth: 1,
                  }}
                  tickMargin={8}
                  minTickGap={12}
                  tick={{
                    fill: "var(--color-chart-tick)",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => {
                    try {
                      const d = new Date(value + "T00:00:00+06:00");
                      return d.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    } catch {
                      return value;
                    }
                  }}
                />

                <ChartTooltip
                  cursor={{
                    stroke: "var(--color-chart-axis)",
                    strokeDasharray: "3 3",
                  }}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        const d = new Date(String(value) + "T00:00:00+06:00");
                        return d.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />

                <Area
                  dataKey="transactions"
                  type="monotone"
                  fill="url(#fillTrans)"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  name="Transactions"
                  dot={{ r: 5, fill: "var(--color-chart-1)" }}
                  activeDot={{ r: 8, fill: "var(--color-chart-1)" }}
                />

                <Area
                  dataKey="scaledVolume"
                  type="monotone"
                  fill="url(#fillVol)"
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  name="Volume"
                  dot={{ r: 5, fill: "var(--color-chart-2)" }}
                  activeDot={{ r: 8, fill: "var(--color-chart-2)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
