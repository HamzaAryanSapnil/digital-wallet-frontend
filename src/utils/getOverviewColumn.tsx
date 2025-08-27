/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/getOverviewTransactionColumns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import type { ITransaction } from "@/types";


/**
 * small helper to mask ObjectId-like strings
 */
function maskId(val?: string) {
  if (!val) return "-";
  if (val.length >= 12) return `${val.slice(0, 6)}...${val.slice(-4)}`;
  return val;
}

export const getOverviewTransactionColumns = (): ColumnDef<ITransaction>[] => {
  return [
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ getValue }) => String(getValue() ?? "-"),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ getValue }) =>
        typeof getValue() === "number"
          ? `৳${getValue<number>().toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}`
          : "-",
    },
    {
      header: "Fee",
      accessorKey: "fee",
      cell: ({ getValue }) =>
        typeof getValue() === "number"
          ? `৳${getValue<number>().toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}`
          : "-",
    },
    {
      header: "Commission",
      accessorKey: "commission",
      cell: ({ getValue }) =>
        typeof getValue() === "number"
          ? `৳${getValue<number>().toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}`
          : "-",
    },
    {
      header: "From",
      accessorKey: "from",
      cell: ({ getValue }) => {
        const v = getValue<any>();
        // if backend already populated with user object { name, email }
        if (v && typeof v === "object") {
          return v.name ?? v.email ?? maskId(String(v._id ?? ""));
        }
        if (typeof v === "string") {
          return maskId(v);
        }
        return "-";
      },
    },
    {
      header: "To",
      accessorKey: "to",
      cell: ({ getValue }) => {
        const v = getValue<any>();
        if (v && typeof v === "object") {
          return v.name ?? v.email ?? maskId(String(v._id ?? ""));
        }
        if (typeof v === "string") {
          return maskId(v);
        }
        return "-";
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const s = String(getValue() ?? "").toLowerCase();
        const cls =
          s === "completed"
            ? "text-green-600 dark:text-green-400"
            : s === "pending"
            ? "text-yellow-600 dark:text-yellow-400"
            : "text-red-600 dark:text-red-400";
        // capitalized status
        const label = s ? s[0].toUpperCase() + s.slice(1) : "-";
        return <span className={cls + " font-medium"}>{label}</span>;
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const v = getValue() as string | undefined;
        if (!v) return "-";
        try {
          return new Date(v).toLocaleString();
        } catch {
          return v;
        }
      },
    },
  ];
};
export default getOverviewTransactionColumns;
