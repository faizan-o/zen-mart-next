import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[300px] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};

export default SkeletonCard;
