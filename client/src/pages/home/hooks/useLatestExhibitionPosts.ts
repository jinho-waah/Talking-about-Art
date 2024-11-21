import { useQuery } from "@tanstack/react-query";
import { getLatestExhibitionPosts } from "../api";
import { QUERY_KEY } from "@/constants";

export const useLatestExhibitionPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LATEST_EXHIBITION_POSTS],
    queryFn: getLatestExhibitionPosts,
  });
};
