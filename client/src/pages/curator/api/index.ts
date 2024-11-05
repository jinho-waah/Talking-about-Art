import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { GetCuratorPostProps } from "../types";

export const getCuratorPost = async ({ id, userId }: GetCuratorPostProps) => {
  const response = await axios.get(
    `${SERVER_DOMAIN}api/curatorPosts/${id}?userId=${userId}`
  );
  return response;
};

export const searchShowForCuratorPost = async (searchQuery: string) => {
  const response = await axios.get(`${SERVER_DOMAIN}api/searchShowId`, {
    params: {
      query: searchQuery,
    },
  });
  return response;
};
