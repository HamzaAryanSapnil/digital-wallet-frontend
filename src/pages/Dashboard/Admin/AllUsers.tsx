import Loader from "@/components/Loader";
import { FilterBar, type FilterOption } from "@/components/reusableFilter";
import { DataTable } from "@/components/reusableTable";
import { role } from "@/constants/role";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from "@/redux/features/Admin/admin.api";
import type { UserRow } from "@/types";
import { getUserColumns } from "@/utils/getUserColumns";
import { useState } from "react";
const userFilters: FilterOption[] = [
  {
    key: "searchTerm",
    label: "Search by name/email",
    type: "text",
    enabled: true,
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "all", label: "All" },
      { value: role.ADMIN, label: "Admin" },
      { value: role.AGENT, label: "Agent" },
      { value: role.USER, label: "User" },
    ],
    enabled: true,
  },
];

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    ...filters,
  });

  if (isLoading) return <Loader />;

  const columns = getUserColumns({
    blockUser,
    unblockUser,
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
          if (cleaned.role === "all") delete cleaned.role;
          setFilters(cleaned);
          setPage(1);
        }}
      />
          
          <div className="my-10 flex justify-center items-center" >
            <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold" >All Users</h1>
          </div>

      <div className="overflow-x-auto">
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
  );
}
