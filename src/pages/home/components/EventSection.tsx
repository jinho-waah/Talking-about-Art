import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const EventSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Event Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48 bg-muted rounded-md">
          <CalendarDays className="w-12 h-12 text-muted-foreground" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Full Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};
