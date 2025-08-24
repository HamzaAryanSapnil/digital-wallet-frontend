import { useState } from "react";
import { useGetAllUsersQuery } from "@/redux/features/Admin/admin.api";
import type { ColumnDef } from "@tanstack/react-table";
import type { UserRow } from "@/types";
import { DataTable } from "@/components/reusableTable";
import { FilterBar, type FilterOption } from "@/components/reusableFilter";

import { UserActions } from "@/components/modules/admin/Modals/UserAction";




const columns: ColumnDef<UserRow>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
  { header: "Phone", accessorKey: "phone" },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original; 
      return (
        <UserActions user={user}/>
      );
    },
  },
];

const userFilters: FilterOption[] = [
  { key: "searchTerm", label: "Search by name/email", type: "text" },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { value: "all", label: "All" },
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ],
  },
];

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    ...filters,
  });

  if (isLoading) return <p>Loading...</p>;

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
