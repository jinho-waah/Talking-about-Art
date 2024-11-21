import { useQuery } from "@tanstack/react-query";
import { getExhibitionPost } from "../api";
import { Exhibition } from "../../types";
import { QUERY_KEY } from "@/constants";

export const useExhibitionPost = (id: string | undefined) => {
  return useQuery<Exhibition>({
    queryKey: [QUERY_KEY.EXHITION_POST, id],
    queryFn: async () => {
      const response = await getExhibitionPost(id);
      return response.data;
    },
  });
};
