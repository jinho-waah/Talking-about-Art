import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { NewPost, PostOrdinaryPostImageProps } from "../../types";

export const postOrdinaryPost = async (newPost: NewPost) => {
  await axios.post(`${SERVER_DOMAIN}api/ordinaryPosts`, newPost, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postOrdinaryPostImage = async ({
  formData,
}: PostOrdinaryPostImageProps) => {
  const { data } = await axios.post(
    `${SERVER_DOMAIN}api/upload/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
