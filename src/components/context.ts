import { createContext } from "react";
import { defaultImageSizes, GalleryProps } from "./gallery/gallery.model";
import { Dark } from "./gallery/themes";

export const defaultProps: GalleryProps = {
  images: [],
  width: 1200,
  height: 600,
  scrollDir: "vertical",
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

export const Context = createContext<GalleryProps>(defaultProps);
