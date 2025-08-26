import { useCallback, useMemo, useState } from "react";
import type { ITransaction } from "@/types";
import { DataTable } from "@/components/reusableTable";
import { FilterBar, type FilterOption } from "@/components/reusableFilter";

import Loader from "@/components/Loader";
import { transactionColumns } from "./AllTransaction.Column";
import { transactionTypes } from "@/types/transaction.types";
import { useGetAllTransactionsQuery } from "@/redux/features/Admin/transaction.api";

const userFilters: FilterOption[] = [
  { key: "searchTerm", label: "Search by type, status", type: "text" },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "all", label: "All" },
      { value: transactionTypes.ADD_MONEY, label: "Add Money" },
      { value: transactionTypes.CASH_IN, label: "Cash In" },
      { value: transactionTypes.CASH_OUT, label: "Cash Out" },
      { value: transactionTypes.SEND_MONEY, label: "Send Money" },
      { value: transactionTypes.WITHDRAW, label: "Withdraw Money" },
    ],
  },
];

export default function AllTransactions() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = useCallback((vals: Record<string, string>) => {
    const cleaned = { ...vals };
    if (cleaned.type === "all") delete cleaned.type;

    setFilters(cleaned);
    setPage(1);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const params = useMemo(
    () => ({ page, limit, ...filters }),
    [page, limit, filters]
  );

  console.log(filters, "all transaction filters");

  const { data, isLoading } = useGetAllTransactionsQuery(params);

  console.log(data, "all transactions data");

  console.log(params, "params sending to api");

  if (isLoading) return <Loader />;

  const columns = transactionColumns;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <FilterBar
        filters={userFilters}
        limit={limit}
        onLimitChange={handleLimitChange}
        onFilterChange={handleFilterChange}
        debounceMs={400}
        visibleKeys={["type"]}
      />
      <div className="my-10 flex justify-center items-center">
        <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold">
          All Transactions
        </h1>
      </div>
      <div className="overflow-x-auto">
        <DataTable<ITransaction>
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
