import { TAB_TITLES } from "@/constants";
import { ExhibitionPostCardSkeleton } from "./ExhibitionPostCardSkeleton";
import { CuratorPostCardSkeleton } from "./CuratorPostCardSkeleton";
import { OrdinaryPostCardSkeleton } from "./OrdinaryPostCardSkeleton";
import { Card } from "@/components/ui/card";

export default function ListSkeleton({ title }: { title: string }) {
  const renderSkeletons = (SkeletonComponent: React.FC) =>
    Array.from({ length: 5 }).map((_, index) => (
      <SkeletonComponent key={index} />
    ));
  return (
    <div>
      {title === TAB_TITLES.CURATOR && renderSkeletons(CuratorPostCardSkeleton)}
      {title === TAB_TITLES.INTRODUCTION &&
        renderSkeletons(ExhibitionPostCardSkeleton)}
      {title === TAB_TITLES.POSTS && (
        <Card>{renderSkeletons(OrdinaryPostCardSkeleton)}</Card>
      )}
    </div>
  );
}
