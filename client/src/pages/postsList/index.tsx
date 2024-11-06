// PostsList.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { lazy, Suspense, useEffect, useState } from "react";
import authStore from "@/store/authStore";
import useFetchPosts from "./hooks/useFetchPosts";
import { TAB_TITLES, Role } from "@/constants";
import { Card } from "@/components/ui/card";
import { PostsListProps } from "./types";
import { CuratorPostCardSkeleton } from "./components/skeletons/CuratorPostCardSkeleton";
import { ExhibitionPostCardSkeleton } from "./components/skeletons/ExhibitionPostCardSkeleton";
import { OrdinaryPostCardSkeleton } from "./components/skeletons/OrdinaryPostCardSkeleton";

const ExhibitionPostCard = lazy(
  () => import("./components/ExhibitionPostCard")
);
const CuratorPostCard = lazy(() => import("./components/CuratorPostCard"));
const OrdinaryPostCard = lazy(() => import("./components/OrdinaryPostCard"));

export default function PostsList({ title }: PostsListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isLogin, role } = authStore();

  const { curatorPosts, ordinaryPosts, exhibitionPosts, fetchPosts } =
    useFetchPosts();

  useEffect(() => {
    setIsLoading(true); // 데이터를 새로 로드하기 전에 로딩 상태로 설정
    fetchPosts(title).finally(() => setIsLoading(false)); // 데이터 로딩 완료 시 로딩 해제
  }, [title]);

  const handlePostClick = (id: number) => {
    switch (title) {
      case TAB_TITLES.UPCOMING_EXHIBITION:
        navigate(pageRoutes.upCommingPost.replace(":id", String(id)));
        break;
      case TAB_TITLES.INTRODUCTION:
        navigate(pageRoutes.currentPost.replace(":id", String(id)));
        break;
      case TAB_TITLES.CURATOR:
        navigate(pageRoutes.curatorPost.replace(":id", String(id)));
        break;
      case TAB_TITLES.POSTS:
        navigate(pageRoutes.ordinaryPost.replace(":id", String(id)));
        break;
      default:
        console.error("Invalid post type");
        break;
    }
  };

  const handleAddPost = () => {
    switch (title) {
      case TAB_TITLES.UPCOMING_EXHIBITION:
      case TAB_TITLES.INTRODUCTION:
        if (role === Role.GALLERY || role === Role.ADMIN)
          navigate(pageRoutes.addExhibition);
        break;
      case TAB_TITLES.CURATOR:
        if (role === Role.CURATOR || role === Role.ADMIN)
          navigate(pageRoutes.addCurator);
        break;
      case TAB_TITLES.POSTS:
        if (isLogin) navigate(pageRoutes.addPost);
        break;
    }
  };

  const canAddPost = () => {
    if (
      (title === TAB_TITLES.UPCOMING_EXHIBITION ||
        title === TAB_TITLES.INTRODUCTION) &&
      (role === Role.GALLERY || role === Role.ADMIN)
    ) {
      return true;
    }
    if (
      title === TAB_TITLES.CURATOR &&
      (role === Role.CURATOR || role === Role.ADMIN)
    ) {
      return true;
    }
    if (title === TAB_TITLES.POSTS && isLogin) {
      return true;
    }
    return false;
  };

  return (
    <div className="container mx-auto px-1 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {canAddPost() && <Button onClick={handleAddPost}>글 추가</Button>}
      </div>
      <Input placeholder="검색..." className="mb-6" />
      {isLoading ? (
        <div>
          {title === TAB_TITLES.CURATOR &&
            Array.from({ length: 5 }).map((_, index) => (
              <CuratorPostCardSkeleton key={index} />
            ))}
          {title === TAB_TITLES.INTRODUCTION &&
            Array.from({ length: 5 }).map((_, index) => (
              <ExhibitionPostCardSkeleton key={index} />
            ))}
          {title === TAB_TITLES.POSTS && (
            <Card>
              {Array.from({ length: 5 }).map((_, index) => (
                <OrdinaryPostCardSkeleton key={index} />
              ))}
            </Card>
          )}
        </div>
      ) : (
        <>
          {title === TAB_TITLES.CURATOR &&
            curatorPosts.map((post, index) => (
              <Suspense key={index} fallback={<CuratorPostCardSkeleton />}>
                <CuratorPostCard
                  key={index}
                  post={post}
                  onClick={handlePostClick}
                />
              </Suspense>
            ))}
          {title === TAB_TITLES.INTRODUCTION &&
            exhibitionPosts.map((post, index) => (
              <Suspense key={index} fallback={<ExhibitionPostCardSkeleton />}>
                <ExhibitionPostCard
                  key={index}
                  post={post}
                  onClick={handlePostClick}
                />
              </Suspense>
            ))}
          {title === TAB_TITLES.POSTS ? (
            <Card>
              {ordinaryPosts.map((post, index) => (
                <Suspense key={index} fallback={<OrdinaryPostCardSkeleton />}>
                  <OrdinaryPostCard
                    key={index}
                    post={post}
                    onClick={handlePostClick}
                  />
                </Suspense>
              ))}
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}
