import { useCallback, useEffect, useRef } from "react";
import { Dimension, ResizeOptions } from "./models";

export default function useResize({
  target,
  onResizeEnded,
  onResizeStarted,
  minWidth = 300,
  minHeight = 300,
  dragRef,
}: ResizeOptions) {
  const clicked = useRef(false);
  const ref = useRef<HTMLElement | null>(null);
  const rect = useRef<DOMRect>();

  const activeDimension = useRef<Dimension>({ height: 0, width: 0 });
  const resizeStarted = useRef<boolean>(false);

  const pointerDown = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    clicked.current = true;
  }, []);

  const pointerUp = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    clicked.current = false;

    if (resizeStarted.current) {
      onResizeEnded?.(activeDimension.current);
      resizeStarted.current = false;
    }
  }, []);

  useEffect(() => {
    if (target) {
      ref.current = target;
      rect.current = target.getBoundingClientRect();

      document.addEventListener("pointerup", pointerUp);
    }
  }, [target]);

  useEffect(() => {
    if (dragRef) {
      dragRef.addEventListener("pointerdown", pointerDown);
    }
  }, [dragRef]);

  const handlePointerMove = useCallback((ev: PointerEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { clientX, clientY } = ev;
    const isClicked = clicked.current;

    if (isClicked && rect.current) {
      const { right, bottom, width, height, left, top } = rect.current;
      const newWidth = width - (right - clientX);
      const newHeight = height - (bottom - clientY);

      if (!resizeStarted.current) {
        onResizeStarted?.();
        resizeStarted.current = true;
      }

      if (ref.current && newWidth > minWidth && newHeight > minHeight) {
        const ele = ref.current;

        ele.style.width = `${newWidth}px`;
        ele.style.height = `${newHeight}px`;

        ele.style.cssText += `
          --rc-gallery-left: ${left}px;
          --rc-gallery-top: ${top}px;`;

        activeDimension.current = {
          height: newHeight,
          width: newWidth,
        };
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (ref.current) {
        const node = ref.current;
        node.removeEventListener("pointerdown", pointerDown);
        node.removeEventListener("pointerup", pointerUp);
      }

      if (dragRef) {
        dragRef.removeEventListener("pointerdown", pointerDown);
      }
    };
  }, []);
}
