import { ActionMenu } from "@/components/modules/admin/Modals/GenericAction";
import type {
  useApproveAgentMutation,
  useBlockUserMutation,
  useSuspendAgentMutation,
  useUnblockUserMutation,
} from "@/redux/features/Admin/admin.api";
import type { UserRow } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

type ActionType = "view" | "block" | "unblock" | "suspend" | "approve";

export const getUserColumns = (opts: {
  blockUser?: ReturnType<typeof useBlockUserMutation>[0];
  unblockUser?: ReturnType<typeof useUnblockUserMutation>[0];
  suspendAgent?: ReturnType<typeof useSuspendAgentMutation>[0];
  approveAgent?: ReturnType<typeof useApproveAgentMutation>[0];
  onView?: (u: UserRow) => void;
  enabledActions: ActionType[];
}): ColumnDef<UserRow>[] => {
  const {
    blockUser,
    unblockUser,
    suspendAgent,
    approveAgent,
    enabledActions,
    onView,
  } = opts;
  return [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        const allActions = {
          view: {
            key: "view",
            label: "View",
            confirmTitle: "View user?",
            confirmDescription: "This will open user details.",
            confirmText: "Confirm View",
            confirm: false,
            onConfirm: (u: UserRow) => {
              if (onView) {
                onView(u);
              }
            },
          },
          block: {
            key: "block",
            label: "Block",
            variant: "destructive",
            confirmTitle: "Block this user?",
            confirmDescription: "This action will block the user.",
            confirmText: "Confirm Block",
            onConfirm: async (u: UserRow) => {
              const res = await blockUser?.(u._id);
              console.log(res, "block res");
              if (res?.data?.success)
                toast.success("User blocked successfully");
              else toast.error("Failed to block user");
            },
          },
          unblock: {
            key: "unblock",
            label: "Unblock",
            confirmTitle: "Unblock this user?",
            confirmDescription: "This will restore access.",
            confirmText: "Confirm Unblock",
            onConfirm: async (u: UserRow) => {
              const res = await unblockUser?.(u._id);
              if (res?.data?.success)
                toast.success("User unblocked successfully");
              else toast.error("Failed to unblock user");
            },
          },
          suspend: {
            key: "suspend",
            label: "Suspend",
            variant: "destructive",
            confirmTitle: "Suspend this agent?",
            confirmDescription: "This action will suspend the agent.",
            confirmText: "Confirm Suspend",
            onConfirm: async (u: UserRow) => {
              const res = await suspendAgent?.(u._id);
              if (res?.data?.success)
                toast.success("Agent suspended successfully");
              else toast.error("Failed to suspend agent");
            },
          },
          approve: {
            key: "approve",
            label: "Approve",
            confirmTitle: "Approve this agent?",
            confirmDescription: "This action will approve the agent.",
            confirmText: "Confirm Approve",
            onConfirm: async (u: UserRow) => {
              const res = await approveAgent?.(u._id);
              if (res?.data?.success)
                toast.success("Agent approved successfully");
              else toast.error("Failed to approve agent");
            },
          },
        } as const;

        return (
          <ActionMenu<UserRow>
            item={user}
            actions={enabledActions.map((a) => allActions[a])}
          />
        );
      },
    },
  ];
};
