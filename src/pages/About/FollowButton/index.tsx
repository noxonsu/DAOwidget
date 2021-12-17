import { useEffect } from "react";

import { Space } from "src/hooks/useSpaces";
import { useFollowSpace } from "src/hooks/useFollow";
import useHover from "src/hooks/useHover";

interface FollowButtonProps {
  spaceObj: Space;
}

function FollowButton(props: FollowButtonProps) {
  const { spaceObj } = props;

  const {
    clickFollow,
    loadFollows,
    isLoadingFollow,
    isLoadingFollows,
    isFollowing,
  } = useFollowSpace(spaceObj.id);

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const buttonText =
    isLoadingFollows || isLoadingFollow
      ? "Loading..."
      : !isFollowing
        ? "Join"
        : isHovered
          ? "Leave"
          : "Joined";

  useEffect(() => {
    loadFollows();
  }, []);

  return (
    <button
      className="secondaryButton"
      onClick={() => clickFollow()}
    >
      <div ref={hoverRef}>{buttonText}</div>
    </button>
  );
}

export default FollowButton;
