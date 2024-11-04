// hooks/useFetchPosts.ts
import { useState } from "react";
import { TAB_TITLES, TabTitle } from "@/constants";
import {
  fetchCuratorPosts,
  fetchExhibitionPosts,
  fetchOrdinaryPosts,
} from "../api";
import { CuratorPosts, ExhibitionPosts, OrdinaryPosts } from "../types";

export default function useFetchPosts() {
  const [curatorPosts, setCuratorPosts] = useState<CuratorPosts[]>([]);
  const [ordinaryPosts, setOrdinaryPosts] = useState<OrdinaryPosts[]>([]);
  const [exhibitionPosts, setExhibitionPosts] = useState<ExhibitionPosts[]>([]);

  const fetchPosts = async (title: TabTitle) => {
    try {
      switch (title) {
        case TAB_TITLES.CURATOR:
          setCuratorPosts(await fetchCuratorPosts());
          break;
        case TAB_TITLES.POSTS:
          setOrdinaryPosts(await fetchOrdinaryPosts());
          break;
        case TAB_TITLES.INTRODUCTION:
        case TAB_TITLES.UPCOMING_EXHIBITION:
          setExhibitionPosts(await fetchExhibitionPosts());
          break;
        default:
          console.error("Invalid title provided");
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${title} posts:`, error);
    }
  };

  return { curatorPosts, ordinaryPosts, exhibitionPosts, fetchPosts };
}
