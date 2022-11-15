export interface ViewerProps {
  url: string;
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
  onClose?: () => void;
  show?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  activeImageIndex: number;
  totalImages: number;
}
