import type { ITransaction } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";



export const transactionColumns: ColumnDef<ITransaction>[] = [
  
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) => `৳${getValue<number>().toFixed(2)}`,
  },
  {
    header: "Fee",
    accessorKey: "fee",
    cell: ({ getValue }) => `৳${getValue<number>().toFixed(2)}`,
  },
  {
    header: "Commission",
    accessorKey: "commission",
    cell: ({ getValue }) => `৳${getValue<number>().toFixed(2)}`,
  },
  {
    header: "From",
    accessorKey: "from",
  },
  {
    header: "To",
    accessorKey: "to",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const color =
        status === "completed"
          ? "text-green-600"
          : status === "pending"
          ? "text-yellow-600"
          : "text-red-600";
      return <span className={color}>{status}</span>;
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleString("en-BD"),
  },
];
