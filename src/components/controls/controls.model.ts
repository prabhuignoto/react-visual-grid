import { ZoomLevel } from "../grid/grid.model";

export type ActionType =
  | "1X"
  | "2X"
  | "3X"
  | "FULL_SCREEN"
  | "GO_UP"
  | "TOGGLE_THEME"
  | "GO_DOWN"
  | "SUBMIT";

export type ControlsProps = {
  onAction: (type: ActionType) => void;
  activeZoom: ZoomLevel;
  isScrolled: boolean;
  isDark?: boolean;
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
