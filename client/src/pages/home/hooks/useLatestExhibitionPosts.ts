import { useQuery } from "@tanstack/react-query";
import { getLatestExhibitionPosts } from "../api";

export const useLatestExhibitionPosts = () => {
  return useQuery({
    queryKey: ["latestExhibitionPosts"],
    queryFn: getLatestExhibitionPosts,
  });
};
