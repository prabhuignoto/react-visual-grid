import { CSSProperties } from "react";
import {
  GalleryProps,
  ImageDimensions,
  ZoomLevel,
} from "../components/gallery/gallery.model";

export type Options = Pick<
  GalleryProps,
  | "mode"
  | "gridDimensions"
  | "width"
  | "height"
  | "scrollDir"
  | "gap"
  | "totalImages"
  | "imageSizes"
  | "theme"
>;

export type Region = { regionTop: number; regionBottom: number };

export type ScrollPositions = {
  scrollLeft: number;
  scrollTop: number;
};

export type useSetupFunctionType = (
  options: Options
) => {
  style: CSSProperties;
  wrapperStyle: CSSProperties;
  onRef: (node: HTMLDivElement) => void;
  windowRegion: Region;
  columns: number;
  rows: number;
  containerDimensions: { width?: number; height?: number };
  fullScreen: () => void;
  resizeImages: (i: ZoomLevel) => void;
  hideImages: boolean | null;
  activeZoomLevel: ZoomLevel;
  scrollPositions: ScrollPositions;
  isScrolled: boolean;
  isFullScreen: boolean;
  rootDimensions: { width?: number; height?: number };
  scrollPercent: number;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  endReached: boolean;
  startReached: boolean;
};

export type StyleProps = {
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
