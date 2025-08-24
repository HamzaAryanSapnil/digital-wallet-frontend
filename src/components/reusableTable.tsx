/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DataTable.tsx
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  meta: { page: number; limit: number; total: number; totalPage: number };
  onPageChange: (page: number) => void;
  onSearch: (term: string) => void;
  onLimitChange: (limit: number) => void;
}

export function DataTable<TData>({
  columns,
  data,
  meta,
  onPageChange,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

//   const limit = meta.limit.toString();

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  meta.page === 1
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : ""
                }
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.page > 1) onPageChange(meta.page - 1);
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={meta.page === 1}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {meta.page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p !== 1 &&
                  p !== meta.totalPage &&
                  p >= meta.page - 1 &&
                  p <= meta.page + 1
              )
              .map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={meta.page === p}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {meta.page < meta.totalPage - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {meta.totalPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={meta.page === meta.totalPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(meta.totalPage);
                  }}
                >
                  {meta.totalPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                className={
                  meta.page === meta.totalPage
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : ""
                }
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta.page < meta.totalPage) onPageChange(meta.page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
