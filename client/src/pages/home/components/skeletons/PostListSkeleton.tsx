import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PostListSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </CardTitle>
      <CardDescription>
        <span className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <span className="ml-2 h-4 w-6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-4 w-6 bg-gray-200 rounded ml-2 animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
