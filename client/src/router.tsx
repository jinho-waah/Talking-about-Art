import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { Home } from "@/pages/home";
import PostsList from "@/pages/postsList";
import { TAB_TITLES } from "@/constants";
import { Role } from "@/constants";
import ExhibitionPost from "./pages/exhibition/exhibitionPost/ExhibitionPost";
import CuratorPost from "@/pages/curator/CuratorPost";
import OrdinaryPost from "@/pages/ordinary/ordinaryPost/OrdinaryPost";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register";
import MyPage from "./pages/myPage/myPage";
import EditMyPage from "./pages/myPage/editMyPage/EditMyPage";
import EventPage from "@/pages/event";
import AddExhibitionPost from "./pages/exhibition/addExhibitionPost/AddExhibitionPost";
import AddCuratorPost from "./pages/curator/AddCuratorPost";
import AddOrdinaryPost from "./pages/ordinary/addOrdinaryPost/AddOrdinaryPost";
import PrivateRoute from "./PrivateRoute";
import { Layout } from "./pages/common/layout/Layout";
import { AuthLayout } from "./pages/common/layout/AuthLayout";
import EditCuratorPost from "./pages/curator/EditCuratorPost";
import EditOrdinaryPost from "./pages/ordinary/editOrdinaryPost/EditOrdinaryPost";

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
      {
        path: pageRoutes.editMyPage,
        element: (
          <PrivateRoute
            allowedRoles={[
              Role.ADMIN,
              Role.GALLERY,
              Role.CURATOR,
              Role.ORDINARY,
            ]}
          >
            <EditMyPage />
          </PrivateRoute>
        ),
      },
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
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.GALLERY]}>
            <AddExhibitionPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.addCurator,
        element: (
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.CURATOR]}>
            <AddCuratorPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.addPost,
        element: (
          <PrivateRoute
            allowedRoles={[
              Role.ADMIN,
              Role.GALLERY,
              Role.CURATOR,
              Role.ORDINARY,
            ]}
          >
            <AddOrdinaryPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.editCuratorPost,
        element: (
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.CURATOR]}>
            <EditCuratorPost />
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.editOrdinaryPost,
        element: (
          <PrivateRoute
            allowedRoles={[
              Role.ADMIN,
              Role.GALLERY,
              Role.CURATOR,
              Role.ORDINARY,
            ]}
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
