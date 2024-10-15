import { TabsContent } from "@/components/ui/tabs";
import EventBone from "./EventBone";
import { EVENT_TAB_TITLES } from "@/constants";

const UpcommingEvent = () => {
  const events = [
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
    {
      id: 3,
      title: "디지털 아트 혁명",
      location: "도쿄",
      date: "2023년 8월 10일",
      time: "오전 9:00 - 오후 5:00",
      attendees: 200,
      organizer: "Elena T.",
    },
    {
      id: 4,
      title: "시간 속의 사진",
      location: "파리",
      date: "2023년 9월 5일",
      time: "오전 10:00 - 오후 8:00",
      attendees: 150,
      organizer: "David L.",
    },
  ];

  return (
    <TabsContent value="upcoming">
      <EventBone events={events} status={EVENT_TAB_TITLES.UPCOMING_EVENT} />
    </TabsContent>
  );
};

export default UpcommingEvent;
