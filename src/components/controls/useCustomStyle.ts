import { CSSProperties, RefObject, useMemo } from "react";

type ScrollPositions = {
  scrollLeft?: number;
  scrollTop?: number;
};

type CustomStyleProps = {
  scrollPositions: ScrollPositions;
  rootHeight: number;
  rootWidth: number;
  controlWrapperRef: RefObject<HTMLElement | HTMLUListElement | null>;
  gridLayout: "horizontal" | "vertical" | undefined; // You can further define a specific type if there are limited values for gridLayout
};

const useCustomStyle = ({
  scrollPositions,
  rootHeight,
  rootWidth,
  controlWrapperRef,
  gridLayout,
}: CustomStyleProps): CSSProperties => {
  return useMemo<CSSProperties>(() => {
    if (controlWrapperRef.current) {
      const { scrollLeft = 0, scrollTop = 0 } = scrollPositions;
      const ele = controlWrapperRef.current as HTMLElement;
      const { clientHeight: controlHeight, clientWidth: controlWidth } = ele;

      let style = {
        [gridLayout === "vertical" ? "top" : "left"]:
          gridLayout === "horizontal"
            ? `${(scrollLeft + rootWidth) / 2 - controlWidth / 2}px`
            : `${scrollTop + rootHeight - controlHeight}px`,
      };

      if (scrollLeft) {
        style = {
          left: `${scrollLeft + rootWidth / 2 - controlWidth / 2}px`,
        };
      } else if (scrollTop) {
        style = {
          top: `${scrollTop + rootHeight - controlHeight}px`,
        };
      }
      return style;
    } else {
      return {};
    }
  }, [
    scrollPositions,
    rootHeight,
    rootWidth,
    controlWrapperRef.current,
    gridLayout,
  ]);
};

export { useCustomStyle };
