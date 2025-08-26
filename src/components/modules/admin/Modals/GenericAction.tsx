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

// Action configuration type
export type ActionConfig<T> = {
  key: string; // unique identifier
  label: string; // shown in dropdown
  variant?: "destructive" | "primary"; // button style
  confirmTitle: string;
  confirmDescription: string;
  confirmText: string;
  confirm?: boolean;
  onConfirm: (item: T) => void | Promise<void>;
};

interface ActionMenuProps<T> {
  item: T; 
  actions: ActionConfig<T>[];
}

export function ActionMenu<T>({ item, actions }: ActionMenuProps<T>) {
  const [dialog, setDialog] = useState<{
    open: boolean;
    action: ActionConfig<T> | null;
  }>({ open: false, action: null });

  const handleConfirm = async () => {
    if (dialog.action) {
      await dialog.action.onConfirm(item); // API call will happen here
    }
    setDialog({ open: false, action: null });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.key}
              onClick={() => {
                if (action.confirm === false) {
                  try {
                    action.onConfirm(item);
                  } catch (err) {
                    console.error(err);
                  }
                  return;
                }

                setDialog({ open: true, action });
              }}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={dialog.open}
        onOpenChange={(open) =>
          setDialog({ ...dialog, open, action: dialog.action })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog.action?.confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialog.action?.confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDialog({ open: false, action: null })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                dialog.action?.variant === "destructive"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-primary text-white hover:bg-primary/90"
              }
              onClick={handleConfirm}
            >
              {dialog.action?.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
