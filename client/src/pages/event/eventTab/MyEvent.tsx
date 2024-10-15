import { TabsContent } from "@/components/ui/tabs";
import EventBone from "./EventBone";
import { EVENT_TAB_TITLES } from "@/constants";

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  organizer: string;
}

const MyEvent = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "현대 미술 쇼케이스",
      location: "뉴욕",
      date: "2023년 6월 15일",
      time: "오전 10:00 - 오후 6:00",
      attendees: 120,
      organizer: "Sarah K.",
    },
    {
      id: 2,
      title: "추상 표현전",
      location: "런던",
      date: "2023년 7월 2일",
      time: "오전 11:00 - 오후 7:00",
      attendees: 85,
      organizer: "Michael R.",
    },
  ];

  return (
    <TabsContent value="my-events">
      <EventBone events={events} status={EVENT_TAB_TITLES.MY_EVENT} />
    </TabsContent>
  );
};

export default MyEvent;
