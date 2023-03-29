import { useCallback, useEffect, useRef } from "react";

type options = {
  escCB?: () => void;
  leftCB?: () => void;
  rightCB?: () => void;
};

export default function useKey({ escCB, leftCB, rightCB }: options) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleKeyUp = useCallback((ev: KeyboardEvent) => {
    const { key } = ev;

    if (key === "Escape") {
      escCB?.();
    } else if (key === "ArrowRight") {
      rightCB?.();
    } else if (key === "ArrowLeft") {
      leftCB?.();
    }
  }, []);

  const onRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
      node.focus();
      node.addEventListener("keyup", handleKeyUp);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (ref.current) {
        const ele = ref.current as HTMLElement;
        ele.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, []);

  return {
    onRef,
  };
}
