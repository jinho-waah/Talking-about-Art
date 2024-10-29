import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { useEffect } from "react";
import authStore from "@/store/authStore";
import CuratorPostCard from "./components/CuratorPostCard";
import OrdinaryPostCard from "./components/OrdinaryPostCard";
import ExhibitionPostCard from "./components/ExhibitionPostCard";
import useFetchPosts from "./hooks/useFetchPosts";
import { TAB_TITLES, TabTitle } from "@/constants";
import { Card } from "@/components/ui/card";

interface PostsListProps {
  title: TabTitle;
}

export default function PostsList({ title }: PostsListProps) {
  const navigate = useNavigate();
  const { isLogin, role } = authStore();

  const { curatorPosts, ordinaryPosts, exhibitionPosts, fetchPosts } =
    useFetchPosts();

  useEffect(() => {
    fetchPosts(title);
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
        if (role === "gallery" || role === "admin")
          navigate(pageRoutes.addExhibition);
        break;
      case TAB_TITLES.CURATOR:
        if (role === "curator" || role === "admin")
          navigate(pageRoutes.addCurator);
        break;
      case TAB_TITLES.POSTS:
        if (isLogin) navigate(pageRoutes.addPost);
        break;
    }
  };

  return (
    <div className="container mx-auto px-1  max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={handleAddPost}>글 추가</Button>
      </div>
      <Input placeholder="Search posts..." className="mb-6" />

      {title === TAB_TITLES.CURATOR &&
        curatorPosts.map((post, index) => (
          <CuratorPostCard key={index} post={post} onClick={handlePostClick} />
        ))}

      {title === TAB_TITLES.POSTS ? (
        <Card>
          {ordinaryPosts.map((post, index) => (
            <OrdinaryPostCard
              key={index}
              post={post}
              onClick={handlePostClick}
            />
          ))}
        </Card>
      ) : null}

      {title === TAB_TITLES.INTRODUCTION &&
        exhibitionPosts.map((post, index) => (
          <ExhibitionPostCard
            key={index}
            post={post}
            onClick={handlePostClick}
          />
        ))}
    </div>
  );
}
