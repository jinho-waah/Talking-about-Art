import { useQuery } from "@tanstack/react-query";
import { CuratorPostData } from "../types";
import { getCuratorPost } from "../api";
import { QUERY_KEY } from "@/constants";

export const useGetCuratorPost = (
  id: string | undefined,
  userId: number | null
) => {
  return useQuery<CuratorPostData>({
    queryKey: [QUERY_KEY.CURATORPOST, id, userId],
    queryFn: async () => {
      const response = await getCuratorPost({ id, userId });
      return response.data;
    },
  });
};
