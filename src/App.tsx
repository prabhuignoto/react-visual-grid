import "./app.css";
import { Masonry } from "./react-visual-grid";

// generate random images array using lorem picsum api
const images = Array.from({ length: 400 }, (_, i) => ({
  alt: `Image ${i + 1}`,
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
}));

function App() {
  return (
    <div className="app">
      {/* <Grid
        gap={10}
        gridDimensions={{ columns: 8 }}
        gridLayout="vertical"
        height={"80%"}
        images={images}
        mode="auto"
        width={"50%"}
      /> */}
      <Masonry height={1200} width={1200}>
        <span className="rc-w-400 rc-h-300">
          <img src="https://picsum.photos/id/1/400/300" alt="Image 1" />
        </span>
        <span className="rc-w-200 rc-h-300">
          <img src="https://picsum.photos/id/20/200/300" alt="Image 2" />
        </span>
        <span className="rc-w-400 rc-h-300">
          <img src="https://picsum.photos/id/35/400/300" alt="Image 3" />
        </span>
        <span className="rc-w-600 rc-h-350">
          <img src="https://picsum.photos/id/4/600/350" alt="Image 3" />
        </span>
        <span className="rc-w-400 rc-h-350">
          <img src="https://picsum.photos/id/6/400/350" alt="Image 3" />
        </span>
        <span className="rc-w-800 rc-h-200">
          <img src="https://picsum.photos/id/8/800/200" alt="Image 3" />
        </span>
        <span className="rc-w-200 rc-h-200">
          <img src="https://picsum.photos/id/8/200/200" alt="Image 3" />
        </span>
        <span className="rc-w-400 rc-h-350">
          <img src="https://picsum.photos/id/35/400/350" alt="Image 3" />
        </span>
        <span className="rc-w-600 rc-h-350">
          <img src="https://picsum.photos/id/4/600/350" alt="Image 3" />
        </span>
      </Masonry>
    </div>
  );
}

export default App;
