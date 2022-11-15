import "./app.css";
import { Gallery } from "./components/gallery/gallery";

// generate random images array using lorem picsum api
const images = Array.from({ length: 1500 }, (_, i) => ({
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
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
        width={2200}
        height={1028}
        scrollDir="vertical"
      />
    </div>
  );
}

export default App;
