import "./app.css";
import { Gallery } from "./components/gallery/gallery";

// generate random images array using lorem picsum api
const images = Array.from({ length: 620 }, (_, i) => ({
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/400/300`,
  alt: `Image ${i + 1}`,
  id: i + 1 + "",
}));

function App() {
  return (
    <div className="app">
      <Gallery
        images={images}
        mode="auto"
        gridDimensions={{ columns: 8 }}
        imageDimensions={{ width: 250, height: 180 }}
        gap={5}
        width={2200}
        height={1200}
        scrollDir="horizontal"
      />
    </div>
  );
}

export default App;
