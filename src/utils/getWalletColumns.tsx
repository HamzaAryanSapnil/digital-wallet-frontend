// utils/getWalletColumns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import type { IWallet } from "@/types";
import type {
  useAdminBlockWalletMutation,
  useAdminUnBlockWalletMutation,
} from "@/redux/features/Admin/wallet.api";
import { ActionMenu } from "@/components/modules/admin/Modals/GenericAction";

type WalletActionType = "view" | "block" | "unblock";

export const getWalletColumns = (opts: {
  blockWallet?: ReturnType<typeof useAdminBlockWalletMutation>[0];
  unblockWallet?: ReturnType<typeof useAdminUnBlockWalletMutation>[0];
  enabledActions: WalletActionType[];
}): ColumnDef<IWallet>[] => {
  const { blockWallet, unblockWallet, enabledActions } = opts;

  return [
    { header: "ID", accessorKey: "_id" },
    { header: "User", accessorKey: "user" },
    {
      header: "Balance",
      accessorKey: "balance",
      cell: ({ getValue }) => `৳${getValue<number>().toFixed(2)}`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const color =
          status === "ACTIVE"
            ? "text-green-600"
            : status === "BLOCKED"
            ? "text-red-600"
            : "text-muted-foreground";
        return <span className={color}>{status}</span>;
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleString("en-BD"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const wallet = row.original;

        const allActions = {
          view: {
            key: "view" as const,
            label: "View",
            confirmTitle: "View wallet?",
            confirmDescription: "Open wallet details.",
            confirmText: "Confirm View",
            onConfirm: (w: IWallet) => {
              // replace with your view logic (navigation/modal)
              console.log("View wallet", w._id);
            },
          },
          block: {
            key: "block" as const,
            label: "Block",
            variant: "destructive" as const,
            confirmTitle: "Block this wallet?",
            confirmDescription: "This action will block the wallet.",
            confirmText: "Confirm Block",
            onConfirm: async (w: IWallet) => {
              try {
                const res = await blockWallet?.(w._id);
                // RTK mutation may return different shapes; adapt if needed
                if (res?.data?.success) {
                  toast.success("Wallet blocked successfully");
                } else {
                  toast.error("Failed to block wallet");
                }
              } catch (err) {
                console.log(err);
                toast.error("Failed to block wallet");
              }
            },
          },
          unblock: {
            key: "unblock" as const,
            label: "Unblock",
            confirmTitle: "Unblock this wallet?",
            confirmDescription: "This action will restore the wallet.",
            confirmText: "Confirm Unblock",
            onConfirm: async (w: IWallet) => {
              try {
                const res = await unblockWallet?.(w._id);
                if (res?.data?.success) {
                  toast.success("Wallet unblocked successfully");
                } else {
                  toast.error("Failed to unblock wallet");
                }
              } catch (err) {
                console.log(err);
                toast.error("Failed to unblock wallet");
              }
            },
          },
        } as const;

        // map enabledActions to actual action objects for ActionMenu
        const actions = enabledActions.map((a) => allActions[a]);

        return <ActionMenu<IWallet> item={wallet} actions={actions} />;
      },
    },
  ];
};
