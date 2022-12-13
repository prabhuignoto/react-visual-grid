import { useEffect } from "react";

export function useMasonry(target?: HTMLElement | null) {
  useEffect(() => {
    if (target) {
      setTimeout(() => {
        const { clientWidth } = target;
        const children = Array.from(target.children);
        const availWidth = clientWidth;
        let filledWidth = 0;
        let nextLeft = 0;
        let nextTop = 0;
        let maxHeight = 0;

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

            style += `width: ${actualWidth}px; height: ${actualHeight}px;`;

            (<HTMLElement>child).style.cssText = style;
            maxHeight = Math.max(maxHeight, actualHeight);
          }
        }, 5000);
      });
    }
  }, [target]);
}
