import { RefObject, useEffect } from "react";
import { MasonryProps } from "../react-visual-grid";
import styles from "./effects.module.scss";

type masonryOptions = Pick<
  MasonryProps,
  "fillMode" | "gutter" | "enableAnimation" | "animationDelay"
> & {
  target?: RefObject<HTMLElement>;
};

export function useMasonry({
  target,
  fillMode = "HORIZONTAL",
  gutter = 2,
  enableAnimation = true,
  animationDelay = 200,
}: masonryOptions) {
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
        const image = (<HTMLElement>child).firstChild as HTMLElement;
        const className = styles[`veil_${fillMode.toLowerCase()}`];

        if (enableAnimation) {
          image.classList.add(className);

          image.addEventListener("load", () => {
            setTimeout(() => {
              image.classList.remove(className);
              image.classList.add(styles.unveil);
            }, animationDelay);
          });
        }

        if (classList) {
          const [width, height] = [
            classList.find((x) => x.includes("-w")),
            classList.find((x) => x.includes("-h")),
          ].map((item) => {
            const cDx = Number(item?.replace(/(rc-w-|rc-h-)/, ""));
            return cDx;
          });

          const actualWidth = width - gutter;
          const actualHeight = height - gutter;

          if (!actualWidth || !actualHeight) {
            return;
          }

          let style = "";

          if (fillMode === "HORIZONTAL") {
            if (filledWidth + actualWidth <= availWidth) {
              style = `;left: ${nextLeft}px; top: ${nextTop}px;`;
              filledWidth += actualWidth + gutter;
              nextLeft = filledWidth + gutter;
            } else {
              nextTop += maxHeight + gutter;
              style = `;left: ${0}px; top: ${nextTop}px;`;
              nextLeft = actualWidth + gutter;
              filledWidth = actualWidth;
              maxHeight = 0;
            }

            maxHeight = Math.max(maxHeight, actualHeight);
          } else if (fillMode === "VERTICAL") {
            if (filledHeight + actualHeight <= availHeight) {
              style = `;top: ${nextTop}px; left: ${nextLeft}px;`;
              filledHeight += actualHeight + gutter;
              nextTop = filledHeight + gutter;
            } else {
              nextLeft += maxWidth + gutter;
              style = `;left: ${nextLeft}px; top: ${0}px;`;
              nextTop = actualHeight + gutter;
              filledHeight = actualHeight;
              maxWidth = 0;
            }

            maxWidth = Math.max(maxWidth, actualWidth);
          }

          style += `
            width: ${actualWidth}px;
            height: ${actualHeight}px;
            visibility: visible;
          `;
          (<HTMLElement>child).style.cssText = style;

          style = "";
        }
      });
    }
  }, [target?.current]);
}
