
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { Space } from "src/hooks/useSpaces";
import { useFollowSpace } from "src/hooks/useFollow";

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
      <div ref={hoverRef}>{!isFollowing ? "Join" : isHovered ? "Leave" : !"Joined" }</div>
      {}
    </button>
  );
}

function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);
  useEffect(
    () => {
      const node: any = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}
export default FollowButton;
