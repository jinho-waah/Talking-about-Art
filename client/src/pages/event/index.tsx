import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import UpcommingEvent from "./eventTab/UpcommingEvent";
import PreviousEvent from "./eventTab/PreviousEvent";
import MyEvent from "./eventTab/MyEvent";
import { EVENT_TAB_TITLES } from "@/constants";

export default function EventPage() {
  const date: Date = new Date();

  return (
    <div className="container mx-auto px-1 py-8">
      <h1 className="text-3xl font-bold mb-6">이벤트</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-auto">
          <CardHeader>
            <CardTitle>캘린더</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              className="border shadow w-auto h-full w-full flex"
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
              mode="single"
              selected={date}
            />
          </CardContent>
        </Card>
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
