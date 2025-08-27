
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import JoyRideController from "../modules/JoyRideController";

export default function RootLayout() {
  return (
    <>
      <JoyRideController />
      <Toaster richColors />
      <Outlet />
    </>
  );
}
