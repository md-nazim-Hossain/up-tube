import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ColumnViewVideoCardSkeletons } from "./video-card-skeleton";

function WatchPageSkeletons() {
  return (
    <div className="container">
      <Skeleton className="w-full h-[200px] sm:h-[300px]" />
      <div className="py-5 flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex-1 space-y-5">
          <Skeleton className="w-1/4 h-6" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-3 items-center">
              <Skeleton className="size-9 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="ml-20 w-24 h-9 rounded-[100vw]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
          <Skeleton className="w-full h-12" />

          <div className="space-y-5">
            <Skeleton className="w-1/2 sm:w-1/5 h-6" />
            <div className="space-y-5">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex justify-between gap-3">
                  <div className="flex-1 flex gap-3 items-center">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="w-full sm:w-1/2 md:w-1/5 h-2" />
                      <Skeleton className="w-full sm:w-1/3 md:w-1/6 h-2" />
                      <Skeleton className="w-1/2 sm:w-1/4 md:w-20 h-2" />
                    </div>
                  </div>
                  <Skeleton className="w-1 h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ColumnViewVideoCardSkeletons />
      </div>
    </div>
  );
}

export default WatchPageSkeletons;