import { useQuery } from "@tanstack/react-query";
import { searchShowForCuratorPost } from "../api";
import { QUERY_KEY } from "@/constants";

export const useSearchShowForCuratorPost = (searchQuery: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH_SHOW_FOR_CURATORPOST, searchQuery],
    queryFn: () => searchShowForCuratorPost(searchQuery),
    enabled: false,
  });
};
