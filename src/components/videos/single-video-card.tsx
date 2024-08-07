"use client";

import { IVideo } from "@/types";
import React from "react";
import { VideoCard, VideoCardAvatar } from "@/components/ui/video-card";
import VideoCardActions from "./video-card-actions";

type Props = IVideo & {
  className?: string;
  playerClassName?: string;
  showAvatar?: boolean;
  showType?: boolean;
  onHoverPlay?: boolean;
};
function SingleVideoCard({
  thumbnail,
  videoFile,
  title,
  owner,
  views,
  duration,
  createdAt,
  _id,
  type,
  className,
  playerClassName,
  showAvatar = true,
  showType = false,
  onHoverPlay = true,
}: Props) {
  const { avatar, username, fullName, isVerified } = owner || {};
  return (
    <VideoCard className={className}>
      <VideoCard.Player
        showType={showType}
        type={type as any}
        thumbnail={thumbnail}
        className={playerClassName}
        url={videoFile}
        videoDuration={duration}
        _id={_id}
        onHoverPlay={onHoverPlay}
      />
      <VideoCard.Footer>
        <div className="flex flex-1 gap-3">
          {showAvatar && (
            <VideoCardAvatar.Avatar
              src={avatar}
              alt={`profile of ${username}`}
              link={`/${username}`}
            />
          )}
          <div className="w-full h-full">
            <VideoCard.Link
              href={type === "short" ? `/shorts/${_id}` : `/watch?v=${_id}`}
            >
              {title}
            </VideoCard.Link>
            <VideoCard.VerifiedBadge
              isVerified
              fullName={fullName}
              channelName={username}
            >
              {isVerified ? "Verified" : "Unverified"}
            </VideoCard.VerifiedBadge>
            <VideoCard.Details createdAt={new Date(createdAt)} views={views} />
          </div>
        </div>
        <VideoCardActions user={owner} />
      </VideoCard.Footer>
    </VideoCard>
  );
}

export default SingleVideoCard;
