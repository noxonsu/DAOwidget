
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
    loadingFollow,
    isFollowing
  } = useFollowSpace(spaceObj.id)


  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const buttonText = loadingFollow
    ? 'Loading...'
    : !isFollowing
      ? "Join"
      : isHovered
        ? "Leave"
        : "Joined"

  useEffect(() => {
    loadFollows()
  }, []);

  return (
    <button
      style={{
        border: "1px solid white",
        padding: "0.5rem",
      }}
      onClick={() => clickFollow()}
    >
      <div ref={hoverRef}>{buttonText}</div>
    </button>
  );
}

export default FollowButton;
