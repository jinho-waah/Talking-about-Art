import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpCommingExhibition from "./TabSection/UpCommingExhibition";
import IntroduceExhibition from "./TabSection/IntroduceExhibition";
import Curators from "./TabSection/Curators";
import useTabTriggerValueStore from "@/store/useTabTriggerValueStore";

const TabSection = () => {
  const { tabTriggerValue, setTabTriggerValue } = useTabTriggerValueStore();

  return (
    <Tabs
      value={tabTriggerValue}
      onValueChange={setTabTriggerValue}
      className="w-full mb-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="introduction">전시 소개</TabsTrigger>
        <TabsTrigger value="upcoming">전시 예정</TabsTrigger>
        <TabsTrigger value="reviews">큐레이터</TabsTrigger>
      </TabsList>
      <IntroduceExhibition />
      <UpCommingExhibition />
      <Curators />
    </Tabs>
  );
};

export default TabSection;
