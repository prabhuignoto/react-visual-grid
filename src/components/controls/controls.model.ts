import { ZoomLevel } from "../grid/grid.model";

export type ActionType =
  | "1X"
  | "2X"
  | "3X"
  | "FULL_SCREEN"
  | "GO_UP"
  | "GO_DOWN";

export type ControlsProps = {
  onAction: (type: ActionType) => void;
  activeZoom: ZoomLevel;
  isScrolled: boolean;
  hide: boolean;
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
  endReached?: boolean;
  startReached?: boolean;
};
