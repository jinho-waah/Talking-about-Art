import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const getLatestOrdinaryPosts = async () => {
  const response = await axios.get(`${SERVER_DOMAIN}api/ordinaryPosts/latest`);
  return response.data;
};

export const getLatestCuratorPosts = async () => {
  const response = await axios.get(`${SERVER_DOMAIN}api/curatorPosts/latest`);
  return response.data;
};

export const getLatestExhibitionPosts = async () => {
  const response = await axios.get(
    `${SERVER_DOMAIN}api/exhibitionPosts/latest`
  );
  return response.data;
};
