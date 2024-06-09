import { IYoutubeVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";

type Props = IYoutubeVideo & {
  className?: string;
  playerClassName?: string;
};
function SingleVideoCard({ url, songName, className, playerClassName }: Props) {
  return (
    <VideoCard className={className}>
      <VideoCard.Player className={playerClassName} url={url} />
      <VideoCard.Footer>
        <div className="flex flex-1 gap-3">
          <VideoCardAvatar.Avatar
            src="https://github.com/shadcn.png"
            alt="Shadcn"
            link="/channel/shadcn"
          />
          <div className="w-full h-full">
            <VideoCard.Link href="/watch?v=">{songName}</VideoCard.Link>
            <VideoCard.VerifiedBadge channelName="Shadcn">
              Verified
            </VideoCard.VerifiedBadge>
            <VideoCard.Details views={1000} />
          </div>
        </div>
        <VideoCard.Actions />
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;