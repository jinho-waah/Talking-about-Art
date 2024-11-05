import { useQuery } from "@tanstack/react-query";
import { CuratorPostData } from "../types";
import { getCuratorPost } from "../api";

export const useGetCuratorPost = (
  id: string | undefined,
  userId: number | null
) => {
  return useQuery<CuratorPostData>({
    queryKey: ["curatorPost", id, userId],
    queryFn: async () => {
      const response = await getCuratorPost({ id, userId });
      return response.data;
    },
  });
};
