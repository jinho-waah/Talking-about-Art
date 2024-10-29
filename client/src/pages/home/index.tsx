import { PostList } from "@/pages/home/components/PostsListSection";
import TabSection from "@/pages/home/components/TabSection";

export const Home = () => {
  return (
    <div>
      <div>
        <TabSection />
        <PostList />
      </div>
    </div>
  );
};
