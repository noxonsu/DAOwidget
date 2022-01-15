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
    <div ref={hoverRef}>
      <button className="secondaryButton" onClick={() => clickFollow()}>
        {buttonText}
      </button>
    </div>
  );
}

export default FollowButton;
