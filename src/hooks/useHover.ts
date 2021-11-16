import { useEffect, useState, useRef, MutableRefObject } from "react";

export default function useHover<T>(
  handleMouseOverCallBack?: () => void,
  handleMouseOutCallBack?: () => void
): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);

  const handleMouseOver = (): void => {
    setValue(true);
    if (!!handleMouseOverCallBack) {
      handleMouseOverCallBack();
    }
  };

  const handleMouseOut = (): void => {
    setValue(false);
    if (!!handleMouseOutCallBack) {
      handleMouseOutCallBack();
    }
  };

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
