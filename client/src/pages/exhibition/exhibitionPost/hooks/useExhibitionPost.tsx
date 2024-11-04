import { useQuery } from "@tanstack/react-query";
import { getExhibitionPost } from "../api";
import { Exhibition } from "../../types";

export const useExhibitionPost = (id: string | undefined) => {
  return useQuery<Exhibition>({
    queryKey: ["exhibitionPost", id],
    queryFn: async () => {
      const response = await getExhibitionPost(id);
      return response.data;
    },
  });
};
