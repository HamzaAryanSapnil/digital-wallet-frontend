import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <CommonLayout>
      {/* <JoyRideController />  joy ride didn't worked*/} 
      
      <Outlet />
    </CommonLayout>
  );
}

export default App;
