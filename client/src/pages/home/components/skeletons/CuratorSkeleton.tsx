import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CuratorsSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </CardTitle>
      <CardDescription>
        <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="ml-2">
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
