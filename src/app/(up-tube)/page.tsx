"use client";
import DiscoverFavorites from "@/components/home/discover-favorites";
import ShortsSlider from "@/components/slider/shorts-slider";
import TopFans from "@/components/top-fans";
import { Typography } from "@/components/ui/typography";
import Videos from "@/components/videos";
import { youtubeVideos } from "@/data";
import { useUserStore } from "@/zustand/useUserStore";

function Home() {
  const user = useUserStore((state) => state.user);
  return (
    <main className="container pt-5">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {user && <DiscoverFavorites />}
          <Typography variant={"h3"}>Videos</Typography>
          <Videos />
        </div>
        <div className="basis-[200px] pb-5">
          <TopFans />
        </div>
      </div>

      <div>
        <Typography variant={"h3"}>Shorts</Typography>
        <ShortsSlider movies={youtubeVideos} />
        <Typography variant={"h3"}>Feed</Typography>
        <Videos isFeed />
      </div>
    </main>
  );
}

export default Home;
