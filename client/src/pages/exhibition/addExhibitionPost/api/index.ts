import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";

export const getGalleryNameByGalleryId = async (galleryId: number | null) => {
  const response = await axios.get(
    `${SERVER_DOMAIN}api/galleryname/${galleryId}`
  );
  return response;
};

export const postExhibitionInformation = async (formData: FormData) => {
  const response = await axios.post(
    `${SERVER_DOMAIN}api/exhibitionPosts`,
    formData
  );
  return response.data;
};
