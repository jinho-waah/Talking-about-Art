import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { TAB_TITLES } from "@/constants";
import { Role } from "@/constants";
import PrivateRoute from "./PrivateRoute";
import { Layout } from "./pages/common/layout/Layout";
import { AuthLayout } from "./pages/common/layout/AuthLayout";
import { Home } from "./pages/home";
import PostsList from "@/pages/postsList";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register";
import MyPage from "./pages/myPage/myPage";
import EventPage from "@/pages/event";
import { LoadingPage } from "./pages/loading/components/LoadingPage";
import ScrollToTop from "./pages/common/layout/hooks/ScrollToTop";

const EditMyPage = lazy(() => import("./pages/myPage/editMyPage/EditMyPage"));
const ExhibitionPost = lazy(
  () => import("./pages/exhibition/exhibitionPost/ExhibitionPost")
);
const CuratorPost = lazy(
  () => import("./pages/curator/CuratorPost/CuratorPost")
);
const OrdinaryPost = lazy(
  () => import("@/pages/ordinary/ordinaryPost/OrdinaryPost")
);
const AddExhibitionPost = lazy(
  () => import("./pages/exhibition/addExhibitionPost/AddExhibitionPost")
);
const AddCuratorPost = lazy(
  () => import("./pages/curator/AddCuratorPost/AddCuratorPost")
);
const EditCuratorPost = lazy(
  () => import("./pages/curator/EditCuratorPost/EditCuratorPost")
);
const EditOrdinaryPost = lazy(
  () => import("./pages/ordinary/editOrdinaryPost/EditOrdinaryPost")
);
const AddOrdinaryPost = lazy(
  () => import("./pages/ordinary/addOrdinaryPost/AddOrdinaryPost")
);

const CommonLayout = ({ isAuth }: { isAuth?: boolean }) =>
  isAuth ? (
    <AuthLayout>
      <ScrollToTop />
      <Outlet />
    </AuthLayout>
  ) : (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingPage />}>{children}</Suspense>
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
            <SuspenseWrapper>
              <EditMyPage />
            </SuspenseWrapper>
          </PrivateRoute>
        ),
      },
      { path: pageRoutes.eventPage, element: <EventPage /> },
      {
        path: pageRoutes.upCommingList,
        element: <PostsList title={TAB_TITLES.UPCOMING_EXHIBITION} />,
      },
      {
        path: pageRoutes.upCommingPost,
        element: (
          <SuspenseWrapper>
            <ExhibitionPost />
          </SuspenseWrapper>
        ),
      },
      {
        path: pageRoutes.currentList,
        element: <PostsList title={TAB_TITLES.INTRODUCTION} />,
      },
      {
        path: pageRoutes.currentPost,
        element: (
          <SuspenseWrapper>
            <ExhibitionPost />
          </SuspenseWrapper>
        ),
      },
      {
        path: pageRoutes.curatorList,
        element: <PostsList title={TAB_TITLES.CURATOR} />,
      },
      {
        path: pageRoutes.curatorPost,
        element: (
          <SuspenseWrapper>
            <CuratorPost />
          </SuspenseWrapper>
        ),
      },
      {
        path: pageRoutes.ordinaryList,
        element: <PostsList title={TAB_TITLES.POSTS} />,
      },
      {
        path: pageRoutes.ordinaryPost,
        element: (
          <SuspenseWrapper>
            <OrdinaryPost />
          </SuspenseWrapper>
        ),
      },
      {
        path: pageRoutes.addExhibition,
        element: (
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.GALLERY]}>
            <SuspenseWrapper>
              <AddExhibitionPost />
            </SuspenseWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.addCurator,
        element: (
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.CURATOR]}>
            <SuspenseWrapper>
              <AddCuratorPost />
            </SuspenseWrapper>
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
            <SuspenseWrapper>
              <AddOrdinaryPost />
            </SuspenseWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: pageRoutes.editCuratorPost,
        element: (
          <PrivateRoute allowedRoles={[Role.ADMIN, Role.CURATOR]}>
            <SuspenseWrapper>
              <EditCuratorPost />
            </SuspenseWrapper>
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
            <SuspenseWrapper>
              <EditOrdinaryPost />
            </SuspenseWrapper>
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
