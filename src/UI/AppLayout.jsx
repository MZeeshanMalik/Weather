import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="">
      {isLoading && <Loader />}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
