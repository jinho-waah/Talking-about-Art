import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpCommingExhibition from "./TabSection/UpCommingExhibition";
import CurrentExhibition from "./TabSection/CurrentExhibition";
import Curators from "./TabSection/Curators";

const TabSection = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "current";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full mb-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="current">전시 소개</TabsTrigger>
        <TabsTrigger value="upcoming">전시 예정</TabsTrigger>
        <TabsTrigger value="reviews">큐레이터</TabsTrigger>
      </TabsList>
      {activeTab === "current" && <CurrentExhibition />}
      {activeTab === "upcoming" && <UpCommingExhibition />}
      {activeTab === "reviews" && <Curators />}
    </Tabs>
  );
};

export default TabSection;
