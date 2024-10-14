import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, Users, Share2 } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function ExhibitionPost() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">Modern Art Showcase</h1>
            <div className="aspect-video bg-muted rounded-lg mb-6"></div>
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                June 15, 2023
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                New York City
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                10:00 AM - 6:00 PM
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                120 Attending
              </Badge>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>About the Exhibition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The Modern Art Showcase is a cutting-edge exhibition featuring
                  works from contemporary artists pushing the boundaries of
                  artistic expression. From interactive installations to
                  thought-provoking paintings, this showcase represents the
                  forefront of modern art.
                </p>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Featured Artists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {["Jane Doe", "John Smith", "Emily Chen"].map(
                    (artist, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {artist
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{artist}</p>
                          <p className="text-sm text-muted-foreground">
                            Contemporary Artist
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Join the Event</CardTitle>
                <CardDescription>
                  Secure your spot at the Modern Art Showcase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">$25.00</p>
                <p className="text-muted-foreground mb-4">General Admission</p>
                <Button className="w-full mb-2">Register Now</Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-2"></div>
                <p className="font-medium">Modern Art Gallery</p>
                <p className="text-sm text-muted-foreground">
                  123 Art Street, New York, NY 10001
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
