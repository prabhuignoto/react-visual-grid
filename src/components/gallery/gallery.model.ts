import { ImageProps } from "../image/image.model";

export type ImageDimensions = {
  width: number;
  height: number;
};

export type GridDimensions = {
  columns?: number;
  rows?: number;
};

export type GalleryProps = {
  // images as array
  images: ImageProps[];

  scrollDir?: "horizontal" | "vertical";

  // dimensions of the image
  imageDimensions?: ImageDimensions;

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
};
