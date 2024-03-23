import { ImageProps } from "../image/image.model";

export type ImageDimensions = {
  width: number;
  height: number;
};

export type GridDimensions = {
  columns?: number;
  rows?: number;
};

export type ZoomLevel = "1X" | "2X" | "3X";

export type ImageSize = {
  // eslint-disable-next-line no-unused-vars
  [key in ZoomLevel]: {
    width: number;
    height: number;
  };
};

export type Position = {
  x: number;
  y: number;
};

export type Theme = {
  backgroundColor: string;
  thumbnailBgColor: string;
  controlBgColor: string;
  controlBtnColor: string;
  controlsBackDropColor: string;
  primaryColor: string;
};

export type GridProps = {
  // images as array
  images: ImageProps[];

  gridLayout?: "horizontal" | "vertical";

  // dimensions of the grid
  gridDimensions?: GridDimensions;

  // width of the gallery
  width?: number | string;

  // height of the gallery
  height?: number | string;

  // vertical and horizontal gap/spacing between images
  gap?: number;

  mode?: "auto" | "manual";

  imageSizes?: ImageSize;

  showProgressBar?: boolean;

  totalImages?: number;

  theme?: Theme;

  enableResize?: boolean;

  enableDarkMode?: boolean;

  submit: (images: ImageProps[]) => void;
};

export const defaultImageSizes = {
  "1X": {
    height: 100,
    width: 120,
  },
  "2X": {
    height: 180,
    width: 200,
  },
  "3X": {
    height: 280,
    width: 320,
  },
};
