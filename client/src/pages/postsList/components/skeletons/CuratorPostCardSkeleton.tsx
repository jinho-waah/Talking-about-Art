import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CuratorPostCardSkeleton = () => (
  <Card className="animate-pulse mb-6">
    <CardHeader>
      <div className="flex itmes-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
    </CardContent>
    <div className="p-4 flex items-center space-x-2">
      <div className="h-4 w-4 bg-gray-200 rounded" />
      <div className="h-4 w-6 bg-gray-200 rounded" />
    </div>
  </Card>
);
