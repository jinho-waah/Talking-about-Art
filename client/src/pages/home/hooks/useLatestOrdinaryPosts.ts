import { useQuery } from "@tanstack/react-query";
import { getLatestOrdinaryPosts } from "../api";
import { QUERY_KEY } from "@/constants";

export const useLateestOrdinaryPost = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LATEST_ORDINARY_POSTS],
    queryFn: getLatestOrdinaryPosts,
  });
};
