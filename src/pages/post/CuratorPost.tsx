import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Share2, Flag } from "lucide-react";
import { Layout } from "../common/components/Layout";

export default function CuratorPost() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-5 ml-1">
            Impressionist Masterpieces
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">
                    Posted on May 20, 2023
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">
                A Journey Through Time and Color
              </h2>
              <p className="text-muted-foreground mb-4">
                The Impressionist Masterpieces exhibition at the Metropolitan
                Museum of Art is a breathtaking journey through the
                revolutionary art movement that changed the course of Western
                art. From Monet's ethereal water lilies to Van Gogh's expressive
                brushstrokes, this collection showcases the best of
                Impressionism.
              </p>
              <p className="text-muted-foreground mb-4">
                The curation is exceptional, guiding visitors through the
                development of Impressionism and its impact on subsequent art
                movements. The lighting and presentation of each piece allow for
                an intimate experience with these iconic works.
              </p>
              <p className="text-muted-foreground">
                While the crowds can be overwhelming at times, it's a small
                price to pay for the opportunity to see these masterpieces up
                close. I highly recommend this exhibition to anyone with an
                interest in art history or those simply looking to be moved by
                the beauty of Impressionist paintings.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Helpful (23)
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </Button>
              </div>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Exhibition Details</h2>
          <Card>
            <CardContent className="grid gap-4 md:grid-cols-2 mt-6">
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Metropolitan Museum of Art
                </p>
                <p className="text-muted-foreground">
                  1000 5th Ave, New York, NY 10028
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dates</h3>
                <p className="text-muted-foreground">
                  April 15, 2023 - September 30, 2023
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Admission</h3>
                <p className="text-muted-foreground">Adults: $25</p>
                <p className="text-muted-foreground">Seniors: $17</p>
                <p className="text-muted-foreground">Students: $12</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hours</h3>
                <p className="text-muted-foreground">
                  Sunday-Thursday: 10am-5pm
                </p>
                <p className="text-muted-foreground">
                  Friday-Saturday: 10am-9pm
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Tickets</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
