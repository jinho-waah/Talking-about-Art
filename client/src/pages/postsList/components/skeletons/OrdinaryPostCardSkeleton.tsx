export const OrdinaryPostCardSkeleton = () => (
  <div className="flex justify-between items-center p-4 border-b border-gray-200 animate-pulse">
    <div className="flex items-center space-x-2">
      <div className="h-5 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className="h-4 w-4 bg-gray-200 rounded mr-1" />
        <div className="h-4 w-6 bg-gray-200 rounded" />
      </div>
      <div className="flex items-center">
        <div className="h-4 w-4 bg-gray-200 rounded mr-1" />
        <div className="h-4 w-6 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);
