/**
 * useStyle
 * @param {StyleOptions} options - The style options for the gallery.
 *
 * StyleOptions properties:
 * @property {Object} rootDimensions - The dimensions of the root element.
 * @property {Object} imageDimensions - The dimensions of the images.
 * @property {string} gridLayout - The layout of the grid (vertical or horizontal).
 * @property {Object} region - The region of the gallery.
 * @property {number} columns - The number of columns in the grid.
 * @property {number} rows - The number of rows in the grid.
 * @property {number} gap - The gap between grid items.
 * @property {string} mode - The mode of the gallery (auto or manual).
 * @property {boolean} isFullScreen - Whether the gallery is in full-screen mode.
 * @property {boolean} isResized - Whether the gallery is resized.
 *
 * @returns {Object} The styles for the gallery and wrapper.
 */
import { CSSProperties, useMemo } from "react";
import { StyleOptions } from "./models";

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
  isResized,
}: StyleOptions) {
  // Core grid settings
  const gridSettings = useMemo<CSSProperties>(() => {
    const { width, height } = imageDimensions;
    const adjustedWidth = width - gap;
    const adjustedHeight = height - gap;

    if (mode === "auto") {
      return gridLayout === "vertical"
        ? {
            gridTemplateColumns: `repeat(${columns}, ${adjustedWidth - gap}px)`,
          }
        : {
            gridAutoFlow: "column",
            gridTemplateColumns: `repeat(${columns}, ${adjustedWidth}px)`,
            gridTemplateRows: `repeat(${rows}, ${adjustedHeight}px)`,
          };
    }

    return { gridTemplateColumns: `repeat(${columns}, ${adjustedWidth}px)` };
  }, [mode, columns, imageDimensions.width, rows, imageDimensions.height]);

  // Styles for the gallery list
  const galleryStyle = useMemo<CSSProperties>(() => {
    const { height, width } = imageDimensions;
    const { regionTop } = region;
    const positionValue =
      Math.max(regionTop * (gridLayout === "vertical" ? height : width), 20) +
      "px";

    return {
      ...gridSettings,
      gap: `${gap}px`,
      gridAutoColumns:
        gridLayout !== "vertical" ? `${width - gap}px` : undefined,
      gridAutoRows: gridLayout === "vertical" ? `${height - gap}px` : undefined,
      left: gridLayout !== "vertical" ? positionValue : undefined,
      top: gridLayout === "vertical" ? positionValue : undefined,
    };
  }, [
    columns,
    gridSettings,
    region.regionTop,
    gridLayout,
    imageDimensions.width,
    imageDimensions.height,
  ]);

  // Styles for the root wrapper
  const wrapperStyle = useMemo<CSSProperties>(() => {
    const { width, height } = rootDimensions;
    let styles: CSSProperties =
      mode === "auto" ? { height: `${height}px`, width: `${width}px` } : {};

    if (isFullScreen || isResized) {
      styles = {
        ...styles,
        left: 0,
        position: isFullScreen ? "fixed" : "absolute",
        top: 0,
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
    isResized,
  ]);

  // Return the new styles
  return {
    galleryStyle,
    wrapperStyle,
  };
}
