import { useCallback, useEffect, useRef } from "react";

type Dimension = {
  width?: number;
  height?: number;
};

type options = {
  target?: HTMLElement | null;
  onResizeStarted?: () => void;
  onResizeEnded?: (d: Dimension) => void;
};

export default function useResize({
  target,
  onResizeEnded,
  onResizeStarted,
}: options) {
  const pointerClicked = useRef(false);

  const targetRef = useRef<HTMLElement | null>(null);
  const targetRect = useRef<DOMRect>();

  const activeDimension = useRef<Dimension>({ width: 0, height: 0 });

  const isResizeStarted = useRef<boolean>(false);

  const pointerDown = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    pointerClicked.current = true;
  }, []);

  const pointerUp = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    pointerClicked.current = false;

    if (isResizeStarted.current) {
      onResizeEnded?.(activeDimension.current);
      isResizeStarted.current = false;
    }
  }, []);

  useEffect(() => {
    if (target) {
      targetRef.current = target;
      targetRect.current = target.getBoundingClientRect();

      target.addEventListener("pointerdown", pointerDown);
      document.addEventListener("pointerup", pointerUp);
    }
  }, [target]);

  const handlePointerMove = useCallback((ev: PointerEvent) => {
    ev.preventDefault();
    const { clientX, clientY } = ev;
    const isClicked = pointerClicked.current;

    const resize = targetRect.current;
    if (isClicked && resize && targetRef.current) {
      const width = resize.width - (resize.right - clientX);
      const height = resize.height - (resize.bottom - clientY);

      if (!isResizeStarted.current) {
        onResizeStarted?.();
        isResizeStarted.current = true;
      }

      if (targetRef.current && width > 400 && height > 400) {
        const ele = targetRef.current;

        ele.style.cssText += `position: absolute;width: ${width}px;height: ${height}px;left: ${resize.left}px;top: ${resize.top}px;`;
        activeDimension.current = {
          width,
          height,
        };
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (targetRef.current) {
        const node = targetRef.current;
        node.removeEventListener("pointerdown", pointerDown);
        node.removeEventListener("pointerup", pointerUp);
      }
    };
  }, []);
}
