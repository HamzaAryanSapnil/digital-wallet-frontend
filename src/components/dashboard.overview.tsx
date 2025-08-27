/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard.api";
import { DataTable } from "./reusableTable";
import { OverviewSectionCards } from "./modules/dashboard/OverviewSectionCards";
import Loader from "./Loader";
import { DashboardTimeseriesChart } from "./modules/dashboard/dashboardTimerSeriesChart";
import { useMemo, useState } from "react";
import getOverviewTransactionColumns from "@/utils/getOverviewColumn";

export const DashboardOverview = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    data: raw,
    isLoading,
    isError,
  } = useGetDashboardOverviewQuery(undefined);

  const data = (raw as any)?.data ?? raw;

  const columns = useMemo(() => getOverviewTransactionColumns(), []);

  if (isLoading)
    return (
      <div className="p-5">
        <Loader />
      </div>
    );
  if (isError)
    return <div className="p-5 text-red-600">Failed to load overview</div>;

  const recent = data?.recent ?? [];

  const totalCount = data?.totals?.txCount ?? recent.length ?? 0;
  const meta = {
    page,
    limit,
    total: totalCount,
    totalPage: Math.max(1, Math.ceil(totalCount / limit || 1)),
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Section Cards */}
      <OverviewSectionCards data={data} />

      <div className="px-0 lg:px-6">
        <DashboardTimeseriesChart chartData={data?.timeseries ?? []} />
      </div>

      {/*  Table */}
      <div className="px-5">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={recent}
            meta={meta}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            onSearch={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
