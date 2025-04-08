export interface viewerprops {
  url: string;
  rect?: {
    x: number;
    y: number;
  };

  top?: number;
  left?: number;
  dimensions: {
    width?: number;
    height?: number;
  };

  node?: element | htmldivelement | null;
  onClose?: () => void;
  show?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  activeImageIndex: number;
  totalImages: number;
}
