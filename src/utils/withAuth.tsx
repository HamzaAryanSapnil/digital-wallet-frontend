import Loader from "@/components/Loader";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
console.count("Render WithAuth");
export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  console.log("With auth Rendered")
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    console.log("withAuth: loading", isLoading, "user:", data?.data);
    if (isLoading) {
      return <Loader />;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
};
