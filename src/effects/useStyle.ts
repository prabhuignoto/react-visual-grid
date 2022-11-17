import { CSSProperties, useMemo } from "react";
import { StyleProps } from "./models";

export function useStyle({
  rootDimensions,
  imageDimensions,
  gridLayout,
  region,
  columns,
  rows,
  gap,
  mode,
  isFullScreen,
}: StyleProps) {
  // core grid settings
  const gridSettings = useMemo<CSSProperties>(() => {
    const { width, height } = imageDimensions;
    const newWidth = width - gap;
    const newHeight = height - gap;

    if (mode === "auto") {
      if (gridLayout === "vertical") {
        return {
          gridTemplateColumns: `repeat(${columns}, ${newWidth - gap * 1}px)`,
        };
      } else {
        return {
          gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${newHeight}px)`,
          gridAutoFlow: "column",
        };
      }
    } else {
      return {
        gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
      };
    }
  }, [mode, columns, imageDimensions.width, rows, imageDimensions.height]);

  // styles for the gallery list
  const galleryStyle = useMemo<CSSProperties>(() => {
    let style = {};
    const { height, width } = imageDimensions;
    const { regionTop } = region;

    if (gridLayout === "vertical") {
      style = {
        gridAutoRows: `${height - gap}px`,
        top: Math.max(regionTop * height, 20) + "px",
      };
    } else {
      style = {
        gridAutoColumns: `${width - gap}px`,
        left: Math.max(regionTop * width, 20) + "px",
      };
    }

    return {
      ...gridSettings,
      ...style,
      gap: `${gap}px`,
    };
  }, [
    columns,
    gridSettings,
    region.regionTop,
    gridLayout,
    imageDimensions.width,
    imageDimensions.height,
  ]);

  // styles for the root wrapper
  const wrapperStyle = useMemo<CSSProperties>(() => {
    let styles = {};
    const { width, height } = rootDimensions;

    if (mode === "auto") {
      styles = {
        width: `${width}px`,
        height: `${height}px`,
      };
    }

    if (isFullScreen) {
      styles = {
        ...styles,
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      };
    }

    return {
      ...styles,
      [`overflow${gridLayout === "vertical" ? "Y" : "X"}`]: "auto",
    };
  }, [
    rootDimensions.width,
    rootDimensions.height,
    gridLayout,
    mode,
    isFullScreen,
  ]);

  // return the new styles
  return {
    wrapperStyle,
    galleryStyle,
  };
}
