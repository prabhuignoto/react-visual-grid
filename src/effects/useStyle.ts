import { CSSProperties, useMemo } from "react";
import { ImageDimensions } from "../components/gallery/gallery.model";
import { Region } from "./models";

type StyleProps = {
  imageDimensions: ImageDimensions;
  region: Region;
  scrollDir?: "vertical" | "horizontal";
  rootDimensions: ImageDimensions;
  mode?: "auto" | "manual";
  isFullScreen: boolean;
  gap: number;
  columns: number;
  rows: number;
};

export function useStyle({
  rootDimensions,
  imageDimensions,
  scrollDir,
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
      if (scrollDir === "vertical") {
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
    console.log(region);

    if (scrollDir === "vertical") {
      style = {
        gridAutoRows: `${height - gap}px`,
        top: region.regionTop * imageDimensions.height + "px",
      };
    } else {
      style = {
        gridAutoColumns: `${width - gap}px`,
        left: region.regionTop * imageDimensions.width + "px",
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
    scrollDir,
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
      [`overflow${scrollDir === "vertical" ? "Y" : "X"}`]: "auto",
    };
  }, [
    rootDimensions.width,
    rootDimensions.height,
    scrollDir,
    mode,
    isFullScreen,
  ]);

  // return the new styles
  return {
    wrapperStyle,
    galleryStyle,
  };
}
