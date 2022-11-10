import { CSSProperties, useMemo } from "react";
import { ImageDimensions } from "../components/gallery/gallery.model";
import { Region } from "./models";

type StyleProps = {
  imageDimensions: ImageDimensions;
  region: Region;
  scrollDir?: "vertical" | "horizontal";
  wrapperDimensions: ImageDimensions;
  mode?: "auto" | "manual";
  isFullScreen: boolean;
  gap: number;
  columns: number;
  rows: number;
};

export function useStyle({
  wrapperDimensions,
  imageDimensions,
  scrollDir,
  region,
  columns,
  rows,
  gap,
  mode,
  isFullScreen,
}: StyleProps) {
  const gridSettings = useMemo<CSSProperties>(() => {
    const { width, height } = imageDimensions;
    const newWidth = width - gap;
    const newHeight = height - gap;

    if (mode === "auto") {
      if (scrollDir === "vertical") {
        return {
          gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
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

  const galleryStyle = useMemo<CSSProperties>(() => {
    let style = {};
    const { height, width } = imageDimensions;

    if (scrollDir === "vertical") {
      style = {
        gridAutoRows: `${height - gap}px`,
        top: region.upperBound * imageDimensions.height + "px",
      };
    } else {
      style = {
        gridAutoColumns: `${width - gap}px`,
        left: region.upperBound * imageDimensions.width + "px",
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
    region.upperBound,
    scrollDir,
    imageDimensions.width,
    imageDimensions.height,
  ]);

  const wrapperStyle = useMemo<CSSProperties>(() => {
    let styles = {};
    const { width, height } = wrapperDimensions;

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
        transform: "translateX(-50%) translateY(-50%)",
        top: "50%",
      };
    }

    return {
      ...styles,
      [`overflow${scrollDir === "vertical" ? "Y" : "X"}`]: "auto",
    };
  }, [
    wrapperDimensions.width,
    wrapperDimensions.height,
    scrollDir,
    mode,
    isFullScreen,
  ]);

  return {
    wrapperStyle,
    galleryStyle,
  };
}
