import "./app.css";
import { Gallery } from "./components/gallery/gallery";

// generate random images array using lorem picsum api
const images = Array.from({ length: 1500 }, (_, i) => ({
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
        gap={10}
        width={1800}
        height={920}
        scrollDir="vertical"
      />
    </div>
  );
}

export default App;
