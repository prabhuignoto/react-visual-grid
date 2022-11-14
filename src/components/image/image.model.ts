export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
  onClick?: (
    src: string,
    rect?: {
      x: number;
      y: number;
    }
  ) => void;
};
