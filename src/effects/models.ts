import { CSSProperties } from "react";
import { GalleryProps } from "../components/gallery/gallery.model";

export type Options = Pick<
  GalleryProps,
  | "mode"
  | "imageDimensions"
  | "gridDimensions"
  | "width"
  | "height"
  | "scrollDir"
  | "gap"
  | "totalImages"
>;

export type Region = { upperBound: number; lowerBound: number };

export type useSetupFunctionType = (options: Options) => {
  style: CSSProperties;
  wrapperStyle: CSSProperties;
  onRef: (node: HTMLDivElement) => void;
  windowRegion: Region;
  columns: number;
  rows: number;
  containerStyle: CSSProperties;
  fullScreen: () => void
};
