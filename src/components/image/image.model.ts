export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  id?: string;
  onClick?: (
    src: string,
    index?: number,
    rect?: {
      x: number;
      y: number;
    }
  ) => void;
  index?: number;
};
