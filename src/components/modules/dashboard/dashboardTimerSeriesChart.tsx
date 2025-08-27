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

const fmtCurrency = (v: number) =>
  `৳${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const fmtNumber = (n: number) => n.toLocaleString("en-US");

const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--color-chart-1)",
  },
  volume: {
    label: "Volume (৳)",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

export function DashboardTimeseriesChart({
  chartData,
}: {
  chartData?: { date: string; transactions: number; volume: number }[];
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  // normalize + sort by date asc
  const aggregated = React.useMemo(() => {
    if (!Array.isArray(chartData)) return [];
    return chartData
      .map((d) => ({
        date: String(d.date),
        transactions: Number(d.transactions ?? 0),
        volume: Number(d.volume ?? 0),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [chartData]);

  const referenceDate = React.useMemo(() => {
    if (aggregated.length > 0)
      return new Date(aggregated[aggregated.length - 1].date + "T00:00:00");
    return new Date();
  }, [aggregated]);

  const filteredData = React.useMemo(() => {
    if (!aggregated.length) return [];
    const days = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;
    const start = new Date(referenceDate);
    start.setDate(start.getDate() - days + 1);
    return aggregated.filter((row) => {
      const dt = new Date(row.date + "T00:00:00");
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

  // scale volume for visualization when values are huge
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

  // show loader-ish if parent provided no data yet (optional)
  if (!chartData) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Transactions & Volume</CardTitle>
          <CardDescription>Waiting for data…</CardDescription>
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
              Daily transaction count and total volume
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
              <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
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

        {scaledChartData.length === 0 ? (
          <div className="min-h-[220px] flex items-center justify-center text-muted-foreground">
            No aggregated data for the selected range.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full">
     
              <ResponsiveContainer width="100%" height="100%">
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
                    stroke="rgba(0,0,0,0.06)"
                    strokeDasharray="3 3"
                    vertical={true}
                    horizontal={false}
                  />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(0,0,0,0.12)", strokeWidth: 1 }}
                    tickMargin={8}
                    minTickGap={12}
                    tick={{
                      fill: "var(--muted-foreground, #666)",
                      fontSize: 12,
                    }}
                    tickFormatter={(value) => {
                      try {
                        const d = new Date(value + "T00:00:00");
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
                      stroke: "rgba(0,0,0,0.12)",
                      strokeDasharray: "3 3",
                    }}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          const d = new Date(String(value) + "T00:00:00");
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
                    strokeWidth={2.2}
                    name="Transactions"
                    dot={{ r: 4, strokeWidth: 0, fill: "var(--color-chart-1)" }}
                    activeDot={{ r: 6, fill: "var(--color-chart-1)" }}
                  />

                  <Area
                    dataKey="scaledVolume"
                    type="monotone"
                    fill="url(#fillVol)"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2.2}
                    name="Volume"
                    dot={{ r: 4, strokeWidth: 0, fill: "var(--color-chart-2)" }}
                    activeDot={{ r: 6, fill: "var(--color-chart-2)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
         
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
