// api/postsApi.ts
import axios from "axios";
import { SERVER_DOMAIN } from "@/constants";
import { CuratorPosts, ExhibitionPosts, OrdinaryPosts } from "../types";

export const fetchCuratorPosts = async (): Promise<CuratorPosts[]> => {
  const response = await axios.get<CuratorPosts[]>(
    `${SERVER_DOMAIN}api/curatorPosts`
  );
  return response.data;
};

export const fetchExhibitionPosts = async (): Promise<ExhibitionPosts[]> => {
  const response = await axios.get<ExhibitionPosts[]>(
    `${SERVER_DOMAIN}api/exhibitionPosts`
  );
  return response.data;
};

export const fetchOrdinaryPosts = async (): Promise<OrdinaryPosts[]> => {
  const response = await axios.get<OrdinaryPosts[]>(
    `${SERVER_DOMAIN}api/ordinaryPosts`
  );
  return response.data;
};
