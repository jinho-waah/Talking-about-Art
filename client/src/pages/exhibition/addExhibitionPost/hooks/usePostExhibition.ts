import { useMutation } from "@tanstack/react-query";
import { postExhibitionInformation } from "../api";
import { useNavigate } from "react-router-dom";

export function usePostExhibition() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["postExhibitionInformation"],
    mutationFn: (formData: FormData) => postExhibitionInformation(formData),
    onSuccess: () => {
      [
        "title",
        "description",
        "startDate",
        "endDate",
        "detailLocation",
        "price",
        "artists",
        "siteLink",
        "instagramSearch",
      ].forEach((key) => localStorage.removeItem(key));

      navigate("/currentlist");
    },
    onError: (error) => {
      console.error("에러 발생:", error);
    },
  });

  return mutation;
}
