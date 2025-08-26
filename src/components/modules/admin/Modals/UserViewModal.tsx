/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "@/redux/features/User/user.api";
import { useGetAllUsersQuery } from "@/redux/features/Admin/admin.api"; // adjust path if different
import { format } from "date-fns";
import { role as UserRole, status as UserStatus } from "@/constants/role";
const ROLE_CONST = UserRole;
const STATUS_CONST = UserStatus;
type MaybeUser = any;

export function UserViewModal({
  userId,
  open,
  onOpenChange,
}: {
  userId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  // Using existing admin.api query with id param (assumes backend handles _id filter)
  const { data, isLoading } = useGetAllUsersQuery({ _id: userId });
  const [updateUser] = useUpdateUserMutation();

  // `data?.data` might be an array or single object depending on endpoint implementation.
  const raw = (data as any)?.data;
  const user: MaybeUser | undefined = Array.isArray(raw) ? raw[0] : raw;

  // local editable state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name ?? "");
      setRole(user?.role ?? "");
      setStatus(user?.status ?? "");
    } else {
      setName("");
      setRole("");
      setStatus("");
    }
  }, [user]);

  const handleSave = async () => {
    if (!userId) return;
    const payload: any = {};
    if (name && name !== user?.name) payload.name = name;
    // only send role/status if changed (and admin is doing it — you can gate this in parent if needed)
    if (role && role !== user?.role) payload.role = role;
    if (status && status !== user?.status) payload.status = status;

    if (Object.keys(payload).length === 0) {
      // nothing to update
      onOpenChange(false);
      return;
    }

    try {
      await updateUser({ userId, payload }).unwrap();
      // optionally show toast in parent
      onOpenChange(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const formatDate = (rawDate?: string | { $date?: string }) => {
    if (!rawDate) return "-";
    try {
      const iso =
        typeof rawDate === "string"
          ? rawDate
          : rawDate?.$date
          ? rawDate.$date
          : undefined;
      if (!iso) return "-";
      return format(new Date(iso), "PP pp"); // e.g. Aug 26, 2025 10:30 AM
    } catch {
      return String(rawDate);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View or update user information here.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-6">Loading...</div>
        ) : !user ? (
          <div className="py-6">User not found.</div>
        ) : (
          <div className="grid gap-4 py-4">
            {/* Name (editable) */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email (readonly) */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email ?? ""}
                readOnly
                disabled
                className="bg-muted/10"
              />
            </div>

            {/* Role (select) */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v)}>
                <SelectTrigger aria-label="Select role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ROLE_CONST.ADMIN}>
                    {ROLE_CONST.ADMIN}
                  </SelectItem>
                  <SelectItem value={ROLE_CONST.AGENT}>
                    {ROLE_CONST.AGENT}
                  </SelectItem>
                  <SelectItem value={ROLE_CONST.USER}>
                    {ROLE_CONST.USER}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status (select) */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v)}>
                <SelectTrigger aria-label="Select status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={STATUS_CONST.ACTIVE}>
                    {STATUS_CONST.ACTIVE}
                  </SelectItem>
                  <SelectItem value={STATUS_CONST.BLOCKED}>
                    {STATUS_CONST.BLOCKED}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Agent-specific read-only info */}
            {user.role === ROLE_CONST.AGENT && (
              <div className="grid gap-2">
                <Label>Agent Approval</Label>
                <div>
                  {user.isApproved ? (
                    <span className="inline-block rounded-md bg-green-100 text-green-800 px-2 py-1 text-sm font-medium">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-block rounded-md bg-red-100 text-red-800 px-2 py-1 text-sm font-medium">
                      Suspended
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Verified / auth provider info (readonly) */}
            <div className="grid gap-2">
              <Label>Verified</Label>
              <div>
                {user.isVerified ? (
                  <span className="text-sm text-green-600">Yes</span>
                ) : (
                  <span className="text-sm text-muted-foreground">No</span>
                )}
              </div>
            </div>

            {Array.isArray(user.auths) && user.auths.length > 0 && (
              <div className="grid gap-2">
                <Label>Auth Providers</Label>
                <div className="text-sm text-muted-foreground">
                  {user.auths.map((a: any, i: number) => (
                    <div key={i}>
                      {a.provider} {a.providerId ? ` — ${a.providerId}` : ""}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* createdAt/updatedAt */}
            <div className="grid gap-2">
              <Label>Created</Label>
              <div className="text-sm text-muted-foreground">
                {formatDate(user.createdAt)}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Updated</Label>
              <div className="text-sm text-muted-foreground">
                {formatDate(user.updatedAt)}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isLoading}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
