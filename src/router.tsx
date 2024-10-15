import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { Home } from "@/pages/home";
import PostsList from "@/pages/postsList";
import { TAB_TITLES } from "@/constants";
import ExhibitionPost from "@/pages/post/ExhibitionPost";
import CuratorPost from "@/pages/post/CuratorPost";
import OrdinaryPost from "@/pages/post/OrdinaryPost";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import UploadExhibitionPage from "@/pages/upload/UploadExhibitionPage";
import UploadPost from "@/pages/upload/UploadPost";
import UploadCurator from "@/pages/upload/UploadCurator";
import MyPage from "@/pages/ myPage";
import EditMyPage from "@/pages/ myPage/EditMyPage";
import EventPage from "@/pages/event";

const CommonLayout = () => <Outlet />;

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home /> },
      { path: pageRoutes.login, element: <LoginPage /> },
      { path: pageRoutes.register, element: <RegisterPage /> },
      { path: pageRoutes.myPage, element: <MyPage /> },
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
      {
        path: pageRoutes.uploadExhibition,
        element: <UploadExhibitionPage />,
      },
      {
        path: pageRoutes.uploadPost,
        element: <UploadPost />,
      },
      {
        path: pageRoutes.uploadCurator,
        element: <UploadCurator />,
      },
    ],
  },
]);

export default router;
