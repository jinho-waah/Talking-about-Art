import { useQuery } from "@tanstack/react-query";
import { OrdinaryPostWithLike } from "../types";
import { fetchOrdinaryPostById } from "../ordinaryPost/api";

export const useFetchOrdinaryPost = (
  id: string | undefined,
  userId: number | null
) => {
  return useQuery<OrdinaryPostWithLike>({
    queryKey: ["ordinaryPost", id, userId],
    queryFn: () => fetchOrdinaryPostById(id, userId),
    enabled: !!id,
  });
};
