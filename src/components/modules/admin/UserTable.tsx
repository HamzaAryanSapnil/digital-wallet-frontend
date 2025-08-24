/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/UsersTable.tsx
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import type { UserRow } from "@/types";



type Props = {
  data: UserRow[] | undefined;
  loading?: boolean;
};

function hasAccessorKey<T>(
  col: ColumnDef<T, any>
): col is ColumnDef<T, any> & { accessorKey: string } {
  return typeof (col as any).accessorKey === "string";
}

export default function UsersTable({ data = [], loading = false }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo<ColumnDef<UserRow, any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
              aria-label={`Select row ${row.id}`}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.name}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">
            {row.original.email}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone ?? "-",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.role ?? "user"}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span className="capitalize">{row.original.status ?? "-"}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) =>
          row.original.createdAt
            ? format(new Date(row.original.createdAt), "MMM d, yyyy")
            : "-",
      },
      {
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast(`Open user ${row.original.name}`);
              }}
            >
              <IconDotsVertical />
              <span className="sr-only">Actions</span>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil((data?.length ?? 0) / pageSize),
    manualPagination: false,
  });

  // simple client-side global search (name or email)
  const filteredRows = React.useMemo(() => {
    if (!globalFilter) return data;
    const q = globalFilter.toLowerCase();
    return data.filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.phone && u.phone.includes(q))
    );
  }, [data, globalFilter]);

  // Sync table data if filter applied (simple approach)
  React.useEffect(() => {
    // Replace table internal data by creating a new table with filtered rows would be required for full integration.
    // For simplicity here we set pageIndex to 0 when filter changes.
    setPageIndex(0);
  }, [globalFilter]);

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="search" className="sr-only">
            Search users
          </Label>
          <Input
            id="search"
            placeholder="Search by name, email or phone..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="min-w-[280px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="page-size" className="sr-only">
            Rows per page
          </Label>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => {
              const n = Number(v);
              setPageSize(n);
              setPageIndex(0);
            }}
          >
            <SelectTrigger id="page-size" className="w-20" size="sm">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50].map((n) => (
                <SelectItem key={n} value={`${n}`}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredRows && filteredRows.length > 0 ? (
              filteredRows
                .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                .map((rowData) => {
                  // create a fake row context to use flexRender on column cell
                  return (
                    <TableRow key={rowData.id}>
                      {columns.map((col) => {
                        if (hasAccessorKey<UserRow>(col)) {
                          const key = col.accessorKey;
                          const value = (rowData as any)[key];
                          return (
                            <TableCell key={`${rowData.id}-${key}`}>
                              {value ?? "-"}
                            </TableCell>
                          );
                        }

                        if (col.id === "actions") {
                          return (
                            <TableCell
                              key={`${rowData.id}-actions`}
                              className="text-right"
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toast(`User ${rowData.name}`)}
                              >
                                <IconDotsVertical />
                              </Button>
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={`${rowData.id}-fallback`}>
                            -
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? "Loading..." : "No users found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {Math.min((pageIndex + 1) * pageSize, filteredRows?.length ?? 0)} of{" "}
          {filteredRows?.length ?? 0}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
          >
            Prev
          </Button>
          <div className="px-3 text-sm">{pageIndex + 1}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPageIndex((p) =>
                (p + 1) * pageSize < (filteredRows?.length ?? 0) ? p + 1 : p
              )
            }
            disabled={(pageIndex + 1) * pageSize >= (filteredRows?.length ?? 0)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
