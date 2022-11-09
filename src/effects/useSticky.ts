import { useCallback, useRef } from "react";

export function useSticky(parent: HTMLElement, target: HTMLElement) {
  const nodeRef = useRef<HTMLElement | null>(null);

  const onRef = useCallback((node: HTMLElement) => {
    if(node) {
      nodeRef.current = node;
    }
  }, []);

  return {
    onRef
  }
}
