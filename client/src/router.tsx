// router 설정 파일
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
import MyPage from "./pages/myPage";
import EditMyPage from "./pages/myPage/EditMyPage";
import EventPage from "@/pages/event";
import AddExhibitionPost from "./pages/exhibition/AddExhibitionPost";
import AddCuratorPost from "./pages/curator/AddCuratorPost";
import AddOrdinaryPost from "./pages/ordinary/components/AddOrdinaryPost";
import PrivateRoute from "./PrivateRoute";
import { Layout } from "./pages/common/layout/Layout";
import { AuthLayout } from "./pages/common/layout/AuthLayout";
import EditCuratorPost from "./pages/curator/EditCuratorPost";
import EditOrdinaryPost from "./pages/ordinary/components/EditOrdinaryPost";

const CommonLayout = ({ isAuth }: { isAuth?: boolean }) =>
  isAuth ? (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );

const router = createBrowserRouter([
  {
    element: <CommonLayout isAuth={false} />,
    children: [
      { path: pageRoutes.main, element: <Home /> },
      { path: pageRoutes.myPageId, element: <MyPage /> },
      { path: pageRoutes.editMyPage, element: <EditMyPage /> },
      { path: pageRoutes.eventPage, element: <EventPage /> },
      {
        path: pageRoutes.upCommingList,
        element: <PostsList title={TAB_TITLES.UPCOMING_EXHIBITION} />,
      },
      { path: pageRoutes.upCommingPost, element: <ExhibitionPost /> },
      {
        path: pageRoutes.currentList,
        element: <PostsList title={TAB_TITLES.INTRODUCTION} />,
      },
      { path: pageRoutes.currentPost, element: <ExhibitionPost /> },
      {
        path: pageRoutes.curatorList,
        element: <PostsList title={TAB_TITLES.CURATOR} />,
      },
      { path: pageRoutes.curatorPost, element: <CuratorPost /> },
      {
        path: pageRoutes.ordinaryList,
        element: <PostsList title={TAB_TITLES.POSTS} />,
      },
      { path: pageRoutes.ordinaryPost, element: <OrdinaryPost /> },
      {
        path: pageRoutes.addExhibition,
        element: (
          <PrivateRoute allowedRoles={["admin", "gallery"]}>
            <AddExhibitionPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.addCurator,
        element: (
          <PrivateRoute allowedRoles={["admin", "curator"]}>
            <AddCuratorPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.addPost,
        element: (
          <PrivateRoute
            allowedRoles={["admin", "gallery", "curator", "general"]}
          >
            <AddOrdinaryPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.editCuratorPost,
        element: (
          <PrivateRoute allowedRoles={["admin", "curator"]}>
            <EditCuratorPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.editOrdinaryPost,
        element: (
          <PrivateRoute
            allowedRoles={["admin", "gallery", "curator", "general"]}
          >
            <EditOrdinaryPost />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    element: <CommonLayout isAuth={true} />,
    children: [
      { path: pageRoutes.login, element: <LoginPage /> },
      { path: pageRoutes.register, element: <RegisterPage /> },
    ],
  },
]);

export default router;
