import ShortVideo from "@/components/short-video";
import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";
import React from "react";

function ShortsVideoPage() {
  return (
    <section className="flex flex-col gap-5 items-center w-full pb-10">
      {youtubeVideos.map((url: IYoutubeVideo, index: number) => (
        <ShortVideo key={index} {...url} />
      ))}
    </section>
  );
}

export default ShortsVideoPage;
