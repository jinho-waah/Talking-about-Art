import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  MessageSquare,
  Star,
  MapPin,
  Hash,
  Heart,
} from "lucide-react";
import { Layout } from "../common/components/Layout"; // Layout 컴포넌트 사용

export const Home = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <div className="flex-1 container mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row">
        <div className="flex-1 md:mr-8 mb-6 md:mb-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Exhibitions</CardTitle>
                  <CardDescription>
                    Discover and join upcoming art events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Modern Art Showcase",
                      "Abstract Expressions",
                      "Digital Art Revolution",
                    ].map((event, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-semibold">{event}</h3>
                          <p className="text-sm text-muted-foreground">
                            New York City • June 15, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussions">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Discussions</CardTitle>
                  <CardDescription>
                    Join the conversation about art and exhibitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "The future of digital art",
                      "Sustainability in exhibitions",
                      "Emerging artists to watch",
                    ].map((topic, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-semibold">{topic}</h3>
                          <p className="text-sm text-muted-foreground">
                            23 replies • 2 hours ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>
                    See what the community thinks about recent exhibitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Impressionist Masterpieces",
                      "Contemporary Sculpture Garden",
                      "Photography Through Time",
                    ].map((exhibition, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-semibold">{exhibition}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-primary text-primary"
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              by John D.
                            </span>
                          </div>
                        </div>
                        <Button variant="link" size="sm">
                          Read
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* New Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Posts</CardTitle>
              <CardDescription>
                Recent updates from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    title: "New Installation at MoMA",
                    author: "Sarah K.",
                    likes: 42,
                  },
                  {
                    title: "Reflections on Abstract Expressionism",
                    author: "Michael R.",
                    likes: 38,
                  },
                  {
                    title: "Virtual Reality in Art: A Game Changer?",
                    author: "Elena T.",
                    likes: 56,
                  },
                  {
                    title: "The Rise of NFT Art Collections",
                    author: "David L.",
                    likes: 29,
                  },
                ].map((post, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {post.author}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {post.likes}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Posts
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="w-full md:w-80">
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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Urban Landscapes",
                  "Surrealist Dreams",
                  "Color Theory in Practice",
                ].map((rec, index) => (
                  <li key={index} className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "#ModernArt",
                  "#DigitalCreation",
                  "#ArtistsUnite",
                  "#ExhibitionDesign",
                  "#CreativeCommunity",
                ].map((tag, index) => (
                  <Button key={index} variant="secondary" size="sm">
                    <Hash className="w-4 h-4 mr-1" />
                    {tag.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Layout>
  );
};
