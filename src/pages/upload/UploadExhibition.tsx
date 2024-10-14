import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, MapPin, Clock, Upload } from "lucide-react";

export default function IntroduceExhibitionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ title, description, date, time, location });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Introduce a New Exhibition</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Exhibition Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exhibition Title</Label>
                <Input
                  id="title"
                  placeholder="Enter the exhibition title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief description of the exhibition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter the exhibition location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Cover Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Introduce Exhibition
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
