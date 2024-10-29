import { useState } from "react";
import { SERVER_DOMAIN, TabTitle } from "@/constants";

export default function useFetchPosts() {
  const [curatorPosts, setCuratorPosts] = useState([]);
  const [ordinaryPosts, setOrdinaryPosts] = useState([]);
  const [exhibitionPosts, setExhibitionPosts] = useState([]);

  const fetchPosts = async (title: TabTitle) => {
    const endpointMap: Record<TabTitle, string> = {
      큐레이터: "curatorPosts",
      게시글: "ordinaryPosts",
      "전시 소개": "exhibitionPosts",
      "전시 예정": "exhibitionPosts",
    };
    try {
      const response = await fetch(`${SERVER_DOMAIN}api/${endpointMap[title]}`);
      const data = await response.json();

      if (title === "큐레이터") setCuratorPosts(data);
      else if (title === "게시글") setOrdinaryPosts(data);
      else if (title === "전시 소개") setExhibitionPosts(data);
    } catch (error) {
      console.error(`Error fetching ${title} posts:`, error);
    }
  };

  return { curatorPosts, ordinaryPosts, exhibitionPosts, fetchPosts };
}
