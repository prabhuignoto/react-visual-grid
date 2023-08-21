/**
 * useResize
 * @property {HTMLElement} target - The target element to be resized.
 * @property {() => void} onResizeEnded - Function to handle resize end.
 * @property {() => void} onResizeStarted - Function to handle resize start.
 * @property {number} minWidth - Minimum width allowed for resizing.
 * @property {number} minHeight - Minimum height allowed for resizing.
 * @property {HTMLElement} dragRef - The element used to initiate drag.
 */

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
  // Store whether pointer is clicked or not
  const clicked = useRef(false);

  // Reference to the target element to be resized
  const ref = useRef<HTMLElement | null>(null);

  // Reference to the current bounding rectangle of the target element
  const rect = useRef<DOMRect>();

  // Store the current dimensions during resizing
  const activeDimension = useRef<Dimension>({ height: 0, width: 0 });

  // Store whether the resizing has started
  const resizeStarted = useRef<boolean>(false);

  // Callback for when pointer is pressed down
  const pointerDown = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    clicked.current = true;
  }, []);

  // Callback for when pointer is released
  const pointerUp = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    clicked.current = false;

    if (resizeStarted.current) {
      onResizeEnded?.(activeDimension.current);
      resizeStarted.current = false;
    }
  }, []);

  useEffect(() => {
    // Set the target element and its initial bounding rectangle
    if (target) {
      ref.current = target;
      rect.current = target.getBoundingClientRect();

      // Attach the pointerup event to the document
      document.addEventListener("pointerup", pointerUp);
    }
  }, [target]);

  useEffect(() => {
    // Attach the pointerdown event to the specified drag reference
    if (dragRef) {
      dragRef.addEventListener("pointerdown", pointerDown);
    }
  }, [dragRef]);

  // Callback for when the pointer moves
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
    // Attach the pointermove event to the window during resizing
    window.addEventListener("pointermove", handlePointerMove);

    // Detach events when unmounting or changing target
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
