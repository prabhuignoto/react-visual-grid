import { useCallback, useEffect, useRef } from "react";

type Options = {
  escCB?: () => void;
  leftCB?: () => void;
  rightCB?: () => void;
};

export default function useKey({ escCB, leftCB, rightCB }: Options) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Handler to manage keyup events
  const handleKeyUp = useCallback(
    (ev: KeyboardEvent) => {
      switch (ev.key) {
        case "Escape":
          escCB?.();
          break;
        case "ArrowRight":
          rightCB?.();
          break;
        case "ArrowLeft":
          leftCB?.();
          break;
        default:
          break; // Handle any other keys if necessary
      }
    },
    [escCB, leftCB, rightCB]
  ); // Dependencies added to ensure the callbacks are updated

  // Callback to set ref and add the keyup event listener
  const onRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        ref.current = node;
        node.focus();
        node.addEventListener("keyup", handleKeyUp);
      }
    },
    [handleKeyUp]
  ); // Dependency added to ensure correct reference to handleKeyUp

  // Cleanup function to remove the keyup event listener when component unmounts
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [handleKeyUp]); // Dependency added to ensure correct reference to handleKeyUp

  return {
    onRef,
  };
}
