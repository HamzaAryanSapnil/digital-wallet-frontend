import Loader from "@/components/Loader";
import { FilterBar, type FilterOption } from "@/components/reusableFilter";
import { DataTable } from "@/components/reusableTable";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetUserTransactionsQuery } from "@/redux/features/User/user.api";
import { transactionTypes, type ITransaction } from "@/types/transaction.types";
import { useCallback, useMemo, useState } from "react";
import { transactionColumns } from "../Admin/AllTransaction.Column";

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
export default function UserTransactionHistory() {
  const { data: userData } = useUserInfoQuery(undefined);
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
  const { data: transactionData, isLoading } =
    useGetUserTransactionsQuery(params);

  if (isLoading) return <Loader />;

  const columns = transactionColumns;
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-4 min-h-screen w-full">
      <h3 className="text-2xl opacity-70 ">
        All Transactions of {userData?.data?.name}
      </h3>
      <h1 className="text-5xl font-bold"> {userData?.data?.name} </h1>
      <div className="w-full space-y-4">
        <FilterBar
          filters={userFilters}
          limit={limit}
          onLimitChange={handleLimitChange}
          onFilterChange={handleFilterChange}
          debounceMs={400}
          visibleKeys={["type"]}
        />

        <div className="overflow-x-auto">
          <DataTable<ITransaction>
            columns={columns}
            data={transactionData?.data || []}
            meta={
              transactionData?.meta || { page, limit, total: 0, totalPage: 1 }
            }
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
  );
}
