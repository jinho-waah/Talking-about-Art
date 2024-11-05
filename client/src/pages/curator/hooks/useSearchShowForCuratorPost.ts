import { useQuery } from "@tanstack/react-query";
import { searchShowForCuratorPost } from "../api";

export const useSearchShowForCuratorPost = (searchQuery: string) => {
  return useQuery({
    queryKey: ["searchShowForCuratorPost", searchQuery],
    queryFn: () => searchShowForCuratorPost(searchQuery),
    enabled: false,
  });
};
