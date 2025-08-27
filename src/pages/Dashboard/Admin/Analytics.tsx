import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Loader from "@/components/Loader";
import { DataTable } from "@/components/reusableTable";
import { SectionCards } from "@/components/section-cards";

import { useGetAllUsersQuery } from "@/redux/features/Admin/admin.api";
import { useGetAllTransactionsQuery } from "@/redux/features/Admin/transaction.api";
import { useGetAllWalletsQuery } from "@/redux/features/Admin/wallet.api";
import type { UserRow } from "@/types";
import { getUserColumns } from "@/utils/getUserColumns";
import { useState } from "react";

export default function Analytics() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5000);
  const { data, isLoading: userLoading } = useGetAllUsersQuery({
    page,
    limit
  });
  const { data: walletsData, isLoading: walletLoading } = useGetAllWalletsQuery(
    {
      page,
      limit,
    }
  );
  const { data: transactionData, isLoading: transactionLoading } =
    useGetAllTransactionsQuery({
      page,
      limit,
    });

  const columns = getUserColumns({
    enabledActions: ["view"],
  });


  if (userLoading || walletLoading || transactionLoading) return <Loader />;
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4  py-4 md:gap-6 md:py-6">
          <SectionCards
            users={data?.data}
            wallets={walletsData?.data}
            transactions={transactionData?.data}
            deltas={{
              users: { value: 12.5, positive: true },
              agents: { value: -20, positive: false },
              transactions: { value: 8.2, positive: true },
              volume: { value: 4.5, positive: true },
            }}
          />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-5">
            <DataTable<UserRow>
              columns={columns}
              data={data?.data || []}
              meta={data?.meta || { page, limit, total: 0, totalPage: 1 }}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              onSearch={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
