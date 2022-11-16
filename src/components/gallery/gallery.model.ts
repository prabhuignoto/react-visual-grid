import { ImageProps } from "../image/image.model";

export type ImageDimensions = {
  width: number;
  height: number;
};

export type GridDimensions = {
  columns?: number;
  rows?: number;
};

export type ImageSize = {
  [key: string]: {
    width: number;
    height: number;
  };
};

export type Position = {
  x: number;
  y: number;
};

export type ZoomLevel = "1X" | "2X" | "3X" | "4X";

export type GalleryProps = {
  // images as array
  images: ImageProps[];

  scrollDir?: "horizontal" | "vertical";

  // dimensions of the image
  // imageDimensions?: ImageDimensions;

  // dimensions of the grid
  gridDimensions?: GridDimensions;

  // width of the gallery
  width?: number;

  // height of the gallery
  height?: number;

  // vertical and horizontal gap/spacing between images
  gap?: number;

  mode?: "auto" | "manual";

  totalImages?: number;

  imageSizes?: ImageSize;
};

export const defaultImageSizes = {
  "1X": {
    width: 120,
    height: 100,
  },
  "2X": {
    width: 200,
    height: 180,
  },
  "3X": {
    width: 320,
    height: 280,
  },
};
