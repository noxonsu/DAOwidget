import { useRef, useEffect } from "react";

export const useHasChanged = (val: any) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
