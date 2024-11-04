import { useQuery } from "@tanstack/react-query";
import { getLatestCuratorPosts } from "../api";

export const useLatestCuratorPosts = () => {
  return useQuery({
    queryKey: ["latestCuratorPosts"],
    queryFn: getLatestCuratorPosts,
  });
};
