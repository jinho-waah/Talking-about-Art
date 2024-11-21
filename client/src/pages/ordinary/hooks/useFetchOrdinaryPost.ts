import { useQuery } from "@tanstack/react-query";
import { OrdinaryPostWithLike } from "../types";
import { fetchOrdinaryPostById } from "../ordinaryPost/api";
import { QUERY_KEY } from "@/constants";

export const useFetchOrdinaryPost = (
  id: string | undefined,
  userId: number | null
) => {
  return useQuery<OrdinaryPostWithLike>({
    queryKey: [QUERY_KEY.ORDINARYPOST, id, userId],
    queryFn: () => fetchOrdinaryPostById(id, userId),
    enabled: !!id,
  });
};
