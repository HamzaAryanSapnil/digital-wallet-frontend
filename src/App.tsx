import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import JoyRideController from "./components/modules/JoyRideController";

function App() {
  return (
    <CommonLayout>
      <JoyRideController />
      <Outlet />
    </CommonLayout>
  );
}

export default App;
