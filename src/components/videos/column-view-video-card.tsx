"use client";

import { IVideo } from "@/types";

import VideoCardActions from "./video-card-actions";
import { VideoCard } from "../ui/video-card";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { viewsFormat } from "@/utils/video";
import { Button } from "../ui/button";
import { LiaTimesSolid } from "react-icons/lia";
import { useDelete } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import DeleteAlertModal from "../modals/delete-alert-modal";
import { useToast } from "../ui/use-toast";

const ColumnViewVideoCard = ({
  video,
  className,
  isWatchedVideo = false,
  playerClassName,
}: {
  className?: string;
  video: IVideo;
  isWatchedVideo?: boolean;
  playerClassName?: string;
}) => {
  const { toast } = useToast();
  const { mutateAsync } = useDelete(
    apiRoutes.users.deleteWatchHistory,
    apiRoutes.users.watchHistory,
    undefined,
    (oldData: any, id) => {
      if (!oldData) return;
      return {
        ...oldData,
        data: oldData?.data?.filter((history: IVideo) => history._id !== id),
      };
    },
  );
  return (
    <VideoCard
      className={cn(
        "sm:max-w-full h-max flex flex-col sm:flex-row gap-3 rounded-md",
        className,
      )}
    >
      <VideoCard.Player
        type={video?.type as any}
        showDuration={video.type === "video"}
        showType={video.type === "short"}
        thumbnail={video?.thumbnail}
        className={cn(
          "sm:max-w-xs lg:max-w-[160px] rounded-md",
          playerClassName,
        )}
        url={video?.videoFile}
        videoDuration={video?.duration}
        durationClassName="bottom-1 right-1"
        _id={video?._id}
      />
      <div className="flex-1 space-y-3">
        <VideoCard.Footer className="py-0">
          <div className={cn(isWatchedVideo && "pt-1.5")}>
            <VideoCard.Link
              className={cn(isWatchedVideo && "text-lg")}
              href={
                video.type === "short"
                  ? `/shorts/${video?._id}`
                  : `/watch?v=${video?._id}`
              }
            >
              {video?.title}
            </VideoCard.Link>
            <div className="flex items-center gap-1">
              <VideoCard.VerifiedBadge
                fullName={video?.owner?.fullName}
                channelName={video?.owner?.username}
                isVerified={video?.owner?.isVerified}
              />
              {isWatchedVideo && (
                <Typography
                  variant={"xsmall"}
                  className="text-slate-400 flex-shrink-0"
                >
                  {viewsFormat(video?.views)} views
                </Typography>
              )}
            </div>
            {!isWatchedVideo && (
              <VideoCard.Details
                createdAt={new Date(video?.createdAt)}
                views={video?.views}
              />
            )}
          </div>
          <div className="flex items-center gap-1 h-max">
            {isWatchedVideo && (
              <DeleteAlertModal
                text="video from watch history"
                onDelete={async () => {
                  try {
                    await mutateAsync(video._id);
                  } catch (error) {
                    toast({
                      variant: "destructive",
                      title: "Failed to remove",
                      description: "Video removed failed from watch history",
                    });
                  }
                }}
                trigger={
                  <Button variant={"icon"} className="size-8">
                    <LiaTimesSolid size={20} />
                  </Button>
                }
              />
            )}
            <VideoCardActions user={video?.owner} show />
          </div>
        </VideoCard.Footer>
        {isWatchedVideo && (
          <Typography
            variant={"xsmall"}
            className="line-clamp-2 text-muted-foreground"
          >
            {video?.description}
          </Typography>
        )}
      </div>
    </VideoCard>
  );
};

export default ColumnViewVideoCard;
