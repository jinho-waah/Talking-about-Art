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
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border shadow w-auto"
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
