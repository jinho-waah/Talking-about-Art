import ExhibitionMainBlock from "./components/ExhibitionMainBlock";
import ExhibitionResponsiveBlock from "./components/ExhibitionResponsiveBlock";
import { useParams } from "react-router-dom";
import { useExhibitionPost } from "./hooks/useExhibitionPost";

export default function ExhibitionPost() {
  const { id } = useParams<{ id: string }>();

  const { data: exhibitionPosts, isLoading, isError } = useExhibitionPost(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !exhibitionPosts) {
    return <div>Error loading exhibition posts.</div>;
  }

  const startDate = new Date(
    exhibitionPosts.show_term_start.replace(/\./g, "-")
  );
  const endDate = new Date(exhibitionPosts.show_term_end.replace(/\./g, "-"));

  const dailyTime: Record<string, string> = JSON.parse(
    exhibitionPosts.business_hours
  );

  return (
    <div className="container px-1 ml-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{exhibitionPosts.show_name}</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <ExhibitionMainBlock
          exhibitionPosts={exhibitionPosts}
          startDate={startDate}
          endDate={endDate}
          dailyTime={dailyTime}
        />
        <ExhibitionResponsiveBlock
          exhibitionPosts={exhibitionPosts}
          dailyTime={dailyTime}
        />
      </div>
    </div>
  );
}
