import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const RecommendSection = () => {
  return (
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
  );
};
