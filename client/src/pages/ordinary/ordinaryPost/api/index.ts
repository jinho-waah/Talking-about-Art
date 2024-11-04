import { SERVER_DOMAIN } from "@/constants";
import { OrdinaryPostWithLike } from "../../types";
import axios from "axios";

export const fetchOrdinaryPostById = async (
  id: string,
  userId: number | null
): Promise<OrdinaryPostWithLike> => {
  const response = await axios.get(`${SERVER_DOMAIN}api/ordinaryPosts/${id}`, {
    params: { userId },
  });
  return response.data;
};

export const deleteOrdinaryPostById = async (id: string): Promise<void> => {
  axios.delete(`${SERVER_DOMAIN}api/ordinaryPosts/${id}`);
};
