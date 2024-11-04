import { SERVER_DOMAIN } from "@/constants";
import axios from "axios";
import { Comment } from "../../types";

export const fetchCommentsByPostId = async (
  postId: string,
  userId: number | null
) => {
  const { data } = await axios.get<Comment[]>(
    `${SERVER_DOMAIN}api/post/comment/${postId}`,
    {
      params: { userId },
    }
  );
  return data;
};

export const updateCommentById = async (
  commentId: number,
  content: string,
  userId: number,
  file?: File
) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("userId", userId.toString());
  if (file) formData.append("file", file);

  await axios.put(`${SERVER_DOMAIN}api/post/comment/${commentId}`, formData);
};

export const deleteCommentById = async (commentId: number) => {
  await axios.delete(`${SERVER_DOMAIN}api/post/comment/${commentId}`);
};

export const postComment = async (id: string, formData: FormData) => {
  axios.post(`${SERVER_DOMAIN}api/post/comment/${id}`, formData);
};
