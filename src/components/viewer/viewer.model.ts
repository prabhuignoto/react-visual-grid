import React from "react";

export interface ViewerProps {
  url: string;
  // isFullScreen: boolean;
  rect: {
    x: number;
    y: number;
  };
  top: number;
  left: number;
  dimensions: {
    width?: number;
    height?: number;
  };
  node: Element | HTMLDivElement | null;
  onClose?: (ev: React.MouseEvent | React.KeyboardEvent) => void;
  show?: boolean;
}
