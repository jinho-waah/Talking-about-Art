import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Search } from "lucide-react";
import { Layout } from "../common/components/Layout";
import UpcommingEvent from "./eventTab/UpcommingEvent";
import PreviousEvent from "./eventTab/PreviousEvent";
import MyEvent from "./eventTab/MyEvent";
import { EVENT_TAB_TITLES } from "@/constants";

export default function EventPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className="container mx-auto px-1 py-8">
        <h1 className="text-3xl font-bold mb-6">이벤트</h1>
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <Card>
            <CardContent className="flex justify-center mt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border shadow"
              />
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Label htmlFor="search" className="sr-only">
                  이벤트 검색
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="이벤트를 검색하세요..."
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
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
    </Layout>
  );
}
