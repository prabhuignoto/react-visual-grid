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
      <Masonry fillMode="VERTICAL" height={1200} width={1200}>
        <span className="rc-w-400 rc-h-300">
          <img alt="Image 1" src="https://picsum.photos/id/1/400/300" />
        </span>
        <span className="rc-w-400 rc-h-500">
          <img alt="Image 2" src="https://picsum.photos/id/20/400/500" />
        </span>
        <span className="rc-w-400 rc-h-300">
          <img alt="Image 3" src="https://picsum.photos/id/35/400/300" />
        </span>
        <span className="rc-w-400 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/4/400/350" />
        </span>
        <span className="rc-w-400 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/6/400/350" />
        </span>
        <span className="rc-w-400 rc-h-400">
          <img alt="Image 3" src="https://picsum.photos/id/8/400/400" />
        </span>
        <span className="rc-w-400 rc-h-150">
          <img alt="Image 3" src="https://picsum.photos/id/8/400/150" />
        </span>
        <span className="rc-w-400 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/35/400/350" />
        </span>
        <span className="rc-w-400 rc-h-600">
          <img alt="Image 3" src="https://picsum.photos/id/4/400/600" />
        </span>
      </Masonry>

      <Masonry fillMode="HORIZONTAL" height={1200} width={1800}>
        <span className="rc-w-600 rc-h-400">
          <img alt="Image 1" src="https://picsum.photos/id/1/600/400" />
        </span>
        <span className="rc-w-500 rc-h-400">
          <img alt="Image 2" src="https://picsum.photos/id/20/500/400" />
        </span>
        <span className="rc-w-700 rc-h-400">
          <img alt="Image 3" src="https://picsum.photos/id/35/700/400" />
        </span>
        <span className="rc-w-1800 rc-h-250">
          <img alt="Image 3" src="https://picsum.photos/id/4/1800/250" />
        </span>
        <span className="rc-w-200 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/6/200/350" />
        </span>
        <span className="rc-w-500 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/8/500/350" />
        </span>
        <span className="rc-w-1100 rc-h-350">
          <img alt="Image 3" src="https://picsum.photos/id/8/1100/350" />
        </span>
        <span className="rc-w-900 rc-h-200">
          <img alt="Image 3" src="https://picsum.photos/id/35/900/200" />
        </span>
        <span className="rc-w-900 rc-h-200">
          <img alt="Image 3" src="https://picsum.photos/id/4/900/200" />
        </span>
      </Masonry>
    </div>
  );
}

export default App;
