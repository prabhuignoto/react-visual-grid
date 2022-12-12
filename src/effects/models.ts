import { CSSProperties, RefObject } from "react";
import {
  GridProps,
  ImageDimensions,
  ZoomLevel,
} from "../components/grid/grid.model";

export type Options = Pick<
  GridProps,
  | "mode"
  | "gridDimensions"
  | "gridLayout"
  | "gap"
  | "totalImages"
  | "imageSizes"
  | "theme"
  | "enableResize"
> & {
  dragRef: HTMLElement | null;
  width: number;
  height: number;
};

export type Region = { regionTop: number; regionBottom: number };

export type ScrollPositions = {
  scrollLeft: number;
  scrollTop: number;
};

export type ScrollOptions = {
  ref: RefObject<HTMLElement>;
  imageDimensions: ImageDimensions;
  gridLayout?: "vertical" | "horizontal";
  resizeStarted?: boolean;
  resizeEnded?: boolean;
  fullScreen?: boolean;
  zoomLevel?: ZoomLevel;
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
  isResized: boolean;
  toggleTheme: () => void;
  isDark?: boolean;
};

export type StyleOptions = {
  imageDimensions: ImageDimensions;
  region: Region;
  gridLayout?: "vertical" | "horizontal";
  rootDimensions: ImageDimensions;
  mode?: "auto" | "manual";
  isFullScreen: boolean;
  gap: number;
  columns: number;
  rows: number;
  isResized?: boolean;
};

export type Dimension = {
  width?: number;
  height?: number;
};

export type ResizeOptions = {
  target?: HTMLElement | null;
  dragRef?: HTMLElement | null;
  onResizeStarted?: () => void;
  onResizeEnded?: (d: Dimension) => void;
  minWidth?: number;
  minHeight?: number;
};
