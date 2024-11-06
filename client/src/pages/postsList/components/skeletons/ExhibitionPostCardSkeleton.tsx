import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ExhibitionPostCardSkeleton = () => (
  <Card className="mb-6 animate-pulse">
    <CardHeader>
      <div className="flex itmes-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="w-full aspect-video rounded-lg mb-6 bg-gray-200" />
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
    </CardContent>
  </Card>
);
