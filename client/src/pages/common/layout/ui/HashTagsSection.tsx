import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash } from "lucide-react";

export const HashTagsSection = () => {
  return (
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
  );
};
