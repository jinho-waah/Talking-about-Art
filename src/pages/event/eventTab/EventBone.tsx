import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { EVENT_TAB_TITLES } from "@/constants";

// Event 타입 정의
interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  organizer: string;
}

// EventBone 컴포넌트 수정
interface EventBoneProps {
  events: Event[];
  status: string;
}

const EventBone: React.FC<EventBoneProps> = ({ events, status }) => {
  const getEmptyMessage = (status: string) => {
    switch (status) {
      case "upcoming":
        return "다가오는 이벤트가 없습니다.";
      case "past":
        return "지난 이벤트가 없습니다.";
      case "my-events":
        return "참가 신청한 이벤트가 없습니다.";
      default:
        return "이벤트가 없습니다.";
    }
  };

  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div>
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.location}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm">주최: {event.organizer}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">자세히 보기</Button>
              {status === EVENT_TAB_TITLES.UPCOMING_EVENT ? (
                <Button>저장 하기</Button>
              ) : status === EVENT_TAB_TITLES.MY_EVENT ? (
                <Button>저장 취소 하기</Button>
              ) : (
                ""
              )}
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {getEmptyMessage(status)}
        </div>
      )}
    </div>
  );
};

export default EventBone;
