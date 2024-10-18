import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpCommingExhibition from "./TabSection/UpCommingExhibition";
import CurrentExhibition from "./TabSection/CurrentExhibition";
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
        <TabsTrigger value="current">전시 소개</TabsTrigger>
        <TabsTrigger value="upcoming">전시 예정</TabsTrigger>
        <TabsTrigger value="reviews">큐레이터</TabsTrigger>
      </TabsList>
      <CurrentExhibition />
      <UpCommingExhibition />
      <Curators />
    </Tabs>
  );
};

export default TabSection;
