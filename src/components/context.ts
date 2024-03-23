import { createContext } from "react";
import { defaultImageSizes, GridProps } from "./grid/grid.model";
import { Dark } from "./grid/themes";
import { ImageProps } from "./image/image.model";

type ContextType = GridProps & {
  display: {
    width: number;
    height: number;
  };
};

export const defaultProps: ContextType = {
  display: {
    height: 0,
    width: 0,
  },
  enableResize: true,
  gap: 20,
  gridDimensions: {
    columns: 3,
  },
  gridLayout: "vertical",
  height: 600,
  imageSizes: defaultImageSizes,
  images: [],
  mode: "auto",
  showProgressBar: true,
  submit: (images: ImageProps[]) => {},
  theme: Dark,
  width: 1200,
};

export const Context = createContext<GridProps>(defaultProps);
