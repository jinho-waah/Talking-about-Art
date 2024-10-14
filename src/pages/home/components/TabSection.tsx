import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UpCommingExhibition } from "./TabSection/UpCommingExhibition";
import Reviews from "./TabSection/Curators";
import IntroduceExhibition from "./TabSection/IntroduceExhibition";

export const TabSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mb-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="upcoming">전시 예정</TabsTrigger>
        <TabsTrigger value="discussions">전시 소개</TabsTrigger>
        <TabsTrigger value="reviews">큐레이터</TabsTrigger>
      </TabsList>

      <UpCommingExhibition />
      <IntroduceExhibition />
      <Reviews />
    </Tabs>
  );
};
