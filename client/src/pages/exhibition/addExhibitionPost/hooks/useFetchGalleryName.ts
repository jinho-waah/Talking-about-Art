import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getGalleryNameByGalleryId } from "../api";
import { QUERY_KEY } from "@/constants";

export function useFetchGalleryName(
  galleryId: number | null,
  setGalleryName: (name: string) => void
) {
  const { data: galleryNameData } = useQuery({
    queryKey: [QUERY_KEY.GALLERY_NAME, galleryId],
    queryFn: () => getGalleryNameByGalleryId(galleryId),
    enabled: !!galleryId,
  });

  useEffect(() => {
    if (galleryNameData) {
      setGalleryName(galleryNameData.data.gallery_name);
    }
  }, [galleryNameData, setGalleryName]);

  return galleryNameData;
}
