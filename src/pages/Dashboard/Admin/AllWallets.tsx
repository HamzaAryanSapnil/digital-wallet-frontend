import { useState } from "react";
import type { IWallet } from "@/types";
import { DataTable } from "@/components/reusableTable";
import { FilterBar, type FilterOption } from "@/components/reusableFilter";

import Loader from "@/components/Loader";
import { useAdminBlockWalletMutation, useAdminUnBlockWalletMutation, useGetAllWalletsQuery } from "@/redux/features/Admin/wallet.api";
import { WalletStatus } from "@/types/wallet.types";
import { getWalletColumns } from "@/utils/getWalletColumns";

const userFilters: FilterOption[] = [
  {
    key: "searchTerm",
    label: "Search by name/email",
    type: "text",
    enabled: false,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "all", label: "All" },
      { value: WalletStatus.ACTIVE, label: "Active" },
      { value: WalletStatus.BLOCKED, label: "Blocked" },
    ],
    enabled: true,
  },
];

export default function AllWallets() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [adminBlockWallet] = useAdminBlockWalletMutation();
  const [adminUnBlockWallet] = useAdminUnBlockWalletMutation();

  const { data, isLoading } = useGetAllWalletsQuery({
    page,
    limit,
    ...filters,
  });

  if (isLoading) return <Loader />;

  const columns = getWalletColumns({
    blockWallet: adminBlockWallet,
    unblockWallet: adminUnBlockWallet,
    enabledActions: ["view", "block", "unblock"],
  });

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <FilterBar
        filters={userFilters}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onFilterChange={(vals) => {
          const cleaned = { ...vals };
          if (cleaned.status === "all") delete cleaned.status;
          setFilters(cleaned);
          setPage(1);
        }}
      />

      <div className="my-10 flex justify-center items-center">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold">
          All Wallets
        </h1>
      </div>

      <div className="overflow-x-auto">
        <DataTable<IWallet>
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
  );
}
