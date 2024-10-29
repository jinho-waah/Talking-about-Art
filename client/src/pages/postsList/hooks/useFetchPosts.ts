import { useState } from "react";
import { SERVER_DOMAIN, TabTitle } from "@/constants";

export default function useFetchPosts() {
  const [curatorPosts, setCuratorPosts] = useState([]);
  const [ordinaryPosts, setOrdinaryPosts] = useState([]);
  const [exhibitionPosts, setExhibitionPosts] = useState([]);

  const fetchPosts = async (title: TabTitle) => {
    let endpoint = "";
    if (title === "큐레이터") endpoint = "curatorPosts";
    else if (title === "게시글") endpoint = "ordinaryPosts";
    else if (title === "전시 소개" || title === "전시 예정")
      endpoint = "exhibitionPosts";

    try {
      const response = await fetch(`${SERVER_DOMAIN}api/${endpoint}`);
      const data = await response.json();

      if (title === "큐레이터") setCuratorPosts(data);
      else if (title === "게시글") setOrdinaryPosts(data);
      else setExhibitionPosts(data); // 전시 관련 포스트에 대해 하나로 처리
    } catch (error) {
      console.error(`Error fetching ${title} posts:`, error);
    }
  };

  return { curatorPosts, ordinaryPosts, exhibitionPosts, fetchPosts };
}
