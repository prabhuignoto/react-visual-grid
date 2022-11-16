import { ZoomLevel } from "../gallery/gallery.model";

export type ActionType = "1X" | "2X" | "3X" | "FULL_SCREEN";

export type ControlsProps = {
  onAction: (type: ActionType) => void;
  activeZoom: ZoomLevel;
  // style: CSSProperties;
  isScrolled: boolean;
  hide: boolean;
  scrollDir: "vertical" | "horizontal";
  // wrapperStyle: CSSProperties;
  scrollPositions: {
    scrollLeft: number;
    scrollTop: number;
  };
  rootHeight?: number;
  rootWidth?: number;
  containerWidth?: string | number;
  containerHeight?: string | number;
  isFullScreen?: boolean;
  scrollPercent?: number;
};
