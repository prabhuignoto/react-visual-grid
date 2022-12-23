import { Grid } from "../react-visual-grid";
import { images } from "./data";

export const GridVertical = () => {
  return (
    <Grid
      gap={10}
      gridDimensions={{ columns: 8 }}
      gridLayout="vertical"
      height={900}
      images={images}
      mode="auto"
      width={1200}
    />
  );
};
