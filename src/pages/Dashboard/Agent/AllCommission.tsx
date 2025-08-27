import { DataTable } from "@/components/reusableTable";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { transactionColumns } from "../Admin/AllTransaction.Column";
import Loader from "@/components/Loader";
import { useState } from "react";
import { useGetAgentCommissionQuery } from "@/redux/features/Agent/agent.api";

export default function AllCommission() {
  const { data: userData } = useUserInfoQuery(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: agentCommission, isLoading } =
    useGetAgentCommissionQuery(undefined);
  console.log(agentCommission);

  if (isLoading) return <Loader />;

  const columns = transactionColumns;
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-4 min-h-screen w-full">
      <h3 className="text-2xl opacity-70 ">All Commissions of Agent</h3>
      <h1 className="text-5xl font-bold"> {userData?.data?.name} </h1>
      <div className="w-full space-y-4">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={agentCommission?.data || []}
            meta={{ page, limit, total: 0, totalPage: 1 }}
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
