import { RefObject, useEffect } from "react";

type FillMode = "HORIZONTAL" | "VERTICAL";

export function useMasonry(
  target?: RefObject<HTMLElement>,
  fillMode: FillMode = "VERTICAL"
) {
  useEffect(() => {
    if (target && target.current) {
      const ele = target.current;
      const { clientWidth, clientHeight } = ele;
      const children = Array.from(ele.children);
      const availWidth = clientWidth;
      const availHeight = clientHeight;
      let filledWidth = 0;
      let filledHeight = 0;
      let nextLeft = 0;
      let nextTop = 0;
      let maxHeight = 0;
      let maxWidth = 0;

      children.forEach((child) => {
        const classList = Array.from(child.classList).filter((cls) =>
          cls.includes("rc-")
        );

        if (classList) {
          const [width, height] = [
            classList.find((x) => x.includes("-w")),
            classList.find((x) => x.includes("-h")),
          ].map((item) => {
            const cDx = Number(item?.replace(/(rc-w-|rc-h-)/, ""));
            return cDx;
          });

          const actualWidth = width;
          const actualHeight = height;

          let style = "";

          if (fillMode === "HORIZONTAL") {
            if (filledWidth + actualWidth <= availWidth) {
              style = `;left: ${nextLeft}px; top: ${nextTop}px;`;
              filledWidth += actualWidth;
              nextLeft = filledWidth;
            } else {
              nextTop += maxHeight;
              style = `;left: ${0}px; top: ${nextTop}px;`;
              nextLeft = actualWidth;
              filledWidth = actualWidth;
              maxHeight = 0;
            }

            style += `width: ${actualWidth}px; height: ${actualHeight}px; visibility: visible;`;

            (<HTMLElement>child).style.cssText = style;
            maxHeight = Math.max(maxHeight, actualHeight);
          } else if (fillMode === "VERTICAL") {
            if (filledHeight + actualHeight <= availHeight) {
              style = `;top: ${nextTop}px; left: ${nextLeft}px;`;
              filledHeight += actualHeight;
              nextTop = filledHeight;
            } else {
              nextLeft += maxWidth;
              style = `;left: ${nextLeft}px; top: ${0}px;`;
              nextTop = actualHeight;
              filledHeight = actualHeight;
              maxWidth = 0;
            }

            style += `width: ${actualWidth}px; height: ${actualHeight}px; visibility: visible;`;

            (<HTMLElement>child).style.cssText = style;
            maxWidth = Math.max(maxWidth, actualWidth);
          }
          style = "";
        }
      });
    }
  }, [target?.current]);
}
