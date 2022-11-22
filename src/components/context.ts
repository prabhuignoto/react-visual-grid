import { createContext } from "react";
import { defaultImageSizes, GridProps } from "./grid/grid.model";
import { Dark } from "./grid/themes";

export const defaultProps: GridProps = {
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
  theme: Dark,
  width: 1200,
};

export const Context = createContext<GridProps>(defaultProps);
