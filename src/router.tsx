import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import { Home } from "./pages/home";

const CommonLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [{ path: pageRoutes.main, element: <Home /> }],
  },
]);

export default router;
