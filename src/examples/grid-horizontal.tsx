import { Grid } from "../react-visual-grid";
import { images } from "./data";

export const GridHorizontal = () => {
  return (
    <Grid
      gap={10}
      gridDimensions={{ columns: 8 }}
      gridLayout="horizontal"
      height={1200}
      images={images}
      mode="auto"
      width={1200}
    />
  );
};
