import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import { Home } from "./pages/home";
import PostsList from "./pages/postsList";
import ExhibitionPost from "./pages/post/ExhibitionPost";
import { TAB_TITLES } from "./constants";
import CuratorPost from "./pages/post/CuratorPost";
import OrdinaryPost from "./pages/post/OrdinaryPost";

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
        path: pageRoutes.upCommingPost,
        element: <ExhibitionPost />,
      },
      {
        path: pageRoutes.introduceList,
        element: <PostsList title={TAB_TITLES.INTRODUCTION} />,
      },
      {
        path: pageRoutes.introducePost,
        element: <ExhibitionPost />,
      },
      {
        path: pageRoutes.curatorList,
        element: <PostsList title={TAB_TITLES.CURATOR} />,
      },
      {
        path: pageRoutes.curatorPost,
        element: <CuratorPost />,
      },
      {
        path: pageRoutes.postList,
        element: <PostsList title={TAB_TITLES.POSTS} />,
      },
      {
        path: pageRoutes.postPost,
        element: <OrdinaryPost />,
      },
    ],
  },
]);

export default router;
