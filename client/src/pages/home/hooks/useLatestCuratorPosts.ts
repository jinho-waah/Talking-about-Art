import { useQuery } from "@tanstack/react-query";
import { getLatestCuratorPosts } from "../api";
import { QUERY_KEY } from "@/constants";

export const useLatestCuratorPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LATEST_CURATOR_POSTS],
    queryFn: getLatestCuratorPosts,
  });
};
