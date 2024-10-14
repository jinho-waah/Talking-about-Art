import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import { Home } from "./pages/home";
import PostsList from "./pages/postsList";
import { TAB_TITLES } from "./constants";

const CommonLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home /> },
      {
        path: pageRoutes.upCommingList,
        element: <PostsList title={TAB_TITLES.UPCOMING_EXHIBITION} />,
      },
      {
        path: pageRoutes.introduceList,
        element: <PostsList title={TAB_TITLES.INTRODUCTION} />,
      },
      {
        path: pageRoutes.reviewList,
        element: <PostsList title={TAB_TITLES.REVIEW} />,
      },
      {
        path: pageRoutes.postList,
        element: <PostsList title={TAB_TITLES.POSTS} />,
      },
    ],
  },
]);

export default router;
