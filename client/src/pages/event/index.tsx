import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcommingEvent from "./eventTab/UpcommingEvent";
import PreviousEvent from "./eventTab/PreviousEvent";
import MyEvent from "./eventTab/MyEvent";
import { EVENT_TAB_TITLES } from "@/constants";

export default function EventPage() {
  return (
    <div className="container mx-auto px-1">
      <h1 className="text-3xl font-bold mb-6">이벤트</h1>
      <div className="grid gap-6 ">
        <div className="space-y-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger value="upcoming">
                {EVENT_TAB_TITLES.UPCOMING_EVENT}
              </TabsTrigger>
              <TabsTrigger value="previous">
                {EVENT_TAB_TITLES.PREVIOUS_EVENT}
              </TabsTrigger>
              <TabsTrigger value="my-events">
                {EVENT_TAB_TITLES.MY_EVENT}
              </TabsTrigger>
            </TabsList>
            <UpcommingEvent />
            <PreviousEvent />
            <MyEvent />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
