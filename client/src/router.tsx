import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { Home } from "@/pages/home";
import PostsList from "@/pages/postsList";
import { TAB_TITLES } from "@/constants";
import ExhibitionPost from "@/pages/exhibition/ExhibitionPost";
import CuratorPost from "@/pages/curator/CuratorPost";
import OrdinaryPost from "@/pages/ordinary/OrdinaryPost";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import MyPage from "@/pages/ myPage";
import EditMyPage from "@/pages/ myPage/EditMyPage";
import EventPage from "@/pages/event";
import AddExhibitionPost from "./pages/exhibition/AddExhibitionPost";
import AddCuratorPost from "./pages/curator/AddCuratorPost";
import AddOrdinaryPost from "./pages/ordinary/AddOrdinaryPost";

const CommonLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home /> },
      { path: pageRoutes.login, element: <LoginPage /> },
      { path: pageRoutes.register, element: <RegisterPage /> },
      { path: pageRoutes.myPageId, element: <MyPage /> },
      { path: pageRoutes.editMyPage, element: <EditMyPage /> },
      { path: pageRoutes.eventPage, element: <EventPage /> },
      {
        path: pageRoutes.upCommingList,
        element: <PostsList title={TAB_TITLES.UPCOMING_EXHIBITION} />,
      },
      {
        path: pageRoutes.upCommingPost,
        element: <ExhibitionPost />,
      },
      {
        path: pageRoutes.currentList,
        element: <PostsList title={TAB_TITLES.INTRODUCTION} />,
      },
      {
        path: pageRoutes.currentPost,
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
      {
        path: pageRoutes.addExhibition,
        element: <AddExhibitionPost />,
      },
      {
        path: pageRoutes.addCurator,
        element: <AddCuratorPost />,
      },
      {
        path: pageRoutes.addPost,
        element: <AddOrdinaryPost />,
      },
    ],
  },
]);

export default router;
