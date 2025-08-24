import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import type { UserRow } from "@/types";

type ActionType = "block" | "unblock" | "suspend" | "view" | "approve" | null;

interface DialogState {
  open: boolean;
  action: ActionType;
  user: UserRow;
}

export function UserActions({ user }: { user: UserRow }) {
  const [dialog, setDialog] = useState<DialogState>({ open: false, action: null, user });

  const handleConfirm = () => {
    if (!dialog.user) return;
    switch (dialog.action) {
      case "block":
        console.log("Block user:", dialog.user._id);
        break;
      case "unblock":
        console.log("Unblock user:", dialog.user._id);
        break;
      case "suspend":
        console.log("Suspend user:", dialog.user._id);
        break;
      case "approve":
        console.log("Approve user:", dialog.user._id);
        break;
      case "view":
        console.log("View user:", dialog.user._id);
        break;
    }
    setDialog({ open: false, action: null, user });
  };

  const getDialogContent = () => {
    switch (dialog.action) {
      case "block":
        return {
          title: "Block this user?",
          description:
            "This action will block the user from accessing the system.",
          confirmText: "Confirm Block",
        };
      case "unblock":
        return {
          title: "Unblock this user?",
          description: "This will restore the user's access.",
          confirmText: "Confirm Unblock",
        };
      case "suspend":
        return {
          title: "Suspend this user?",
          description: "This action will suspend the agents's account.",
          confirmText: "Confirm Suspend",
        };
      case "approve":
        return {
          title: "Suspend this user?",
          description: "This action will suspend the agents's account.",
          confirmText: "Confirm Suspend",
        };
      
      default:
        return { title: "", description: "", confirmText: "" };
    }
  };

  const content = getDialogContent();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setDialog({ open: true, action: "view", user })}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog({ open: true, action: "block", user })}
          >
            Block
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog({ open: true, action: "unblock", user })}
          >
            Unblock
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog({ open: true, action: "suspend", user })}
          >
            Suspend
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialog({ open: true, action: "approve", user })}
          >
            Approve
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{content.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {content.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDialog({ open: false, action: null, user })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                dialog.action === "block" || dialog.action === "suspend"
                  ? "bg-red-600 text-white hover:bg-red-700" // destructive style
                  : "bg-primary text-white hover:bg-primary/90" // primary style
              }
              onClick={handleConfirm}
            >
              {content.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
