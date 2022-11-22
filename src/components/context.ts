import { createContext } from "react";
import { defaultImageSizes, GridProps } from "./grid/grid.model";
import { Dark } from "./grid/themes";

export const defaultProps: GridProps = {
  images: [],
  width: 1200,
  height: 600,
  gridLayout: "vertical",
  gridDimensions: {
    columns: 3,
  },
  gap: 20,
  mode: "auto",
  imageSizes: defaultImageSizes,
  showProgressBar: true,
  // theme: White,
  theme: Dark,
};

export const Context = createContext<GridProps>(defaultProps);
