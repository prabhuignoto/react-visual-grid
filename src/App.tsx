import "./app.css";
import { Grid } from "./components/grid/grid";

// generate random images array using lorem picsum api
const images = Array.from({ length: 500 }, (_, i) => ({
  alt: `Image ${i + 1}`,
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
}));

function App() {
  return (
    <div className="app">
      <Grid
        gap={10}
        gridDimensions={{ columns: 8 }}
        gridLayout="vertical"
        height={1200}
        images={images}
        mode="auto"
        width={1900}
      />
    </div>
  );
}

export default App;
