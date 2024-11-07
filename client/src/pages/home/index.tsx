import { PostList } from "@/pages/home/components/PostsListSection";
import TabSection from "@/pages/home/components/TabSection";

export const Home = () => {
  return (
    <div className="max-w-4xl ml-auto">
      <TabSection />
      <PostList />
    </div>
  );
};
