import { cn } from "@/lib/utils";
import { useState } from "react";
import Comment from "./comment";
import { Button } from "../ui/button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IComment } from "@/types";

const RecursiveComments: React.FC<{
  comments: IComment[];
  contentId: string;
  className?: string;
  inputClassName?: string;
}> = ({ comments, contentId, className, inputClassName }) => {
  const [showNested, setShowNested] = useState<{ [key: string]: boolean }>({});
  const toggleNested = (parentId: string) => {
    setShowNested((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
  };
  return (
    <div className="space-y-5">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className={cn(comment?.parentComment ? "pl-12" : "pl-0")}
        >
          <Comment
            key={comment._id}
            comment={comment}
            className={className}
            contentId={contentId}
            inputClassName={inputClassName}
          />

          <div className="ml-12 pb-2 pt-1">
            {comment?.replies.length > 0 && (
              <Button
                onClick={() => toggleNested(comment._id)}
                className="rounded-[100vw] space-x-2 hover:bg-destructive/20 text-destructive w-max h-8"
                variant="flat"
              >
                {showNested[comment?._id] ? (
                  <FaAngleDown size={16} />
                ) : (
                  <FaAngleUp size={16} />
                )}
                <span>{comment?.replies.length} replies</span>
              </Button>
            )}
          </div>
          {showNested[comment?._id] && (
            <>
              {comment?.replies.length > 0 && (
                <RecursiveComments
                  inputClassName={inputClassName}
                  comments={comment?.replies}
                  contentId={contentId}
                  className={className}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default RecursiveComments;
