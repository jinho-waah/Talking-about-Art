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
import { TabTitle } from "@/constants";
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
      case "전시 예정":
        navigate(pageRoutes.upCommingPost.replace(":id", String(id)));
        break;
      case "전시 소개":
        navigate(pageRoutes.currentPost.replace(":id", String(id)));
        break;
      case "큐레이터":
        navigate(pageRoutes.curatorPost.replace(":id", String(id)));
        break;
      case "게시글":
        navigate(pageRoutes.ordinaryPost.replace(":id", String(id)));
        break;
      default:
        console.error("Invalid post type");
        break;
    }
  };

  const handleAddPost = () => {
    switch (title) {
      case "전시 예정":
      case "전시 소개":
        if (role === "gallery" || role === "admin")
          navigate(pageRoutes.addExhibition);
        break;
      case "큐레이터":
        if (role === "curator" || role === "admin")
          navigate(pageRoutes.addCurator);
        break;
      case "게시글":
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

      {title === "큐레이터" &&
        curatorPosts.map((post, index) => (
          <CuratorPostCard key={index} post={post} onClick={handlePostClick} />
        ))}

      {title === "게시글" ? (
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

      {title === "전시 소개" &&
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
