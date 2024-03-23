import { Grid } from "../react-visual-grid";
import { images } from "./data";

export const GridVertical = () => {
  return (
    <Grid
      gap={10}
      gridDimensions={{ columns: 8 }}
      gridLayout="vertical"
      height={1200}
      images={images}
      mode="auto"
      submit={(images) => {}}
      width={1200}
    />
  );
};
