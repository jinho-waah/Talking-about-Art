import { pageRoutes } from "@/apiRoutes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const EventSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const handleToEventPage = () => {
    navigate(pageRoutes.eventPage);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>이벤트</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center w-auto">
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
          onSelect={setDate}
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleToEventPage}
        >
          이벤트 보기
        </Button>
      </CardFooter>
    </Card>
  );
};
