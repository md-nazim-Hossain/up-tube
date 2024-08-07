import React from "react";
import UpTubeAvatarImage from "./uptube/uptube-avatar-image";
import { Typography } from "./ui/typography";
import Link from "next/link";
import FollowUnfollow from "./channel/follow-unfollow";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  username: string;
  avatar: string;
  fullName: string;
  isFollow: boolean;
  revalidateQueryKey: string;
  channelId: string;
};
function Follower({
  username,
  avatar,
  fullName,
  isFollow,
  revalidateQueryKey,
  channelId,
}: Props) {
  const queryClient = useQueryClient();
  return (
    <div className="w-full max-w-[230px] md:max-w-[240px] space-y-1.5 mx-auto">
      <Link href={`/${username}`} className="space-y-2.5">
        <UpTubeAvatarImage
          src={avatar}
          alt={`Avatar of ${username}`}
          className="size-[230px] md:size-[240px]"
          name={fullName}
        />
        <Typography variant={"small"} className="block font-normal text-center">
          {username}
        </Typography>
      </Link>
      <div className="flex items-center justify-center">
        <FollowUnfollow
          isFollow={isFollow}
          onSuccess={() =>
            queryClient.invalidateQueries({
              queryKey: [revalidateQueryKey, undefined],
            })
          }
          className="text-destructive h-max text-xs px-2 py-0.5"
          channelName={fullName}
          channelId={channelId}
        />
      </div>
    </div>
  );
}

export default Follower;
