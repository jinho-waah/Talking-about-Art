import { PostList } from "@/pages/home/components/PostsListSection";
import TabSection from "@/pages/home/components/TabSection";
import { EventSection } from "@/pages/home/components/EventSection";
import { RecommendSection } from "@/pages/home/components/RecommendSection";
import { HashTagsSection } from "@/pages/home/components/HashTagsSection";

export const Home = () => {
  return (
    <div className="flex-1 container mx-auto px-1 py-6 md:py-8 flex flex-col md:flex-row">
      <div className="flex-1 md:mr-8 mb-6 md:mb-0">
        <TabSection />
        <PostList />
      </div>
      <aside className="w-full md:w-80">
        <EventSection />
        <RecommendSection />
        <HashTagsSection />
      </aside>
    </div>
  );
};
