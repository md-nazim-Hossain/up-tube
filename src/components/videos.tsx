import { IYoutubeVideo } from "@/types";
import React from "react";
import SingleVideoCard from "./single-video-card";
import { cn } from "@/lib/utils";

type Props = {
  videos: IYoutubeVideo[];
  className?: string;
};
function Videos({ videos, className }: Props) {
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {videos.map((url: IYoutubeVideo, index) => (
        <SingleVideoCard key={index} {...url} />
      ))}
    </div>
  );
}

export default Videos;