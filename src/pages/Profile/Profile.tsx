import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import EditProfileModal from "@/components/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Profile() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;

  if (!user) return <div>Loading...</div>;

  const isAgent = user.role === "AGENT";
  const agentStatus = isAgent
    ? user.isApproved
      ? "Approved"
      : "Suspended"
    : null;

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleString()
    : "N/A";
  const updatedAt = user.updatedAt
    ? new Date(user.updatedAt).toLocaleString()
    : "N/A";

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Top Profile Card */}
      <Card className="lg:w-3xl xl:w-5xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Profile</CardTitle>
          <EditProfileModal user={user} currentRole={user.role} />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Primary Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {user.name ? user.name.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {user.role}
                {agentStatus && ` • ${agentStatus}`}
              </p>
              <p className="text-sm text-muted-foreground">{user.status}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p>{user.phone || "N/A"}</p>
            </div>

            <div>
              <p className="font-medium">Created At</p>
              <p>{createdAt}</p>
            </div>
            <div>
              <p className="font-medium">Updated At</p>
              <p>{updatedAt}</p>
            </div>
            <div>
              <Link to="/change-password">
                <Button> Change Password </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
