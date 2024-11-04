import { useQuery } from "@tanstack/react-query";
import { getLatestOrdinaryPosts } from "../api";

export const useLateestOrdinaryPost = () => {
  return useQuery({
    queryKey: ["latestOrdinaryPosts"],
    queryFn: getLatestOrdinaryPosts,
  });
};
