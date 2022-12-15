/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./app.css";
import { Masonry } from "./react-visual-grid";

// generate random images array using lorem picsum api
// const images = Array.from({ length: 400 }, (_, i) => ({
//   alt: `Image ${i + 1}`,
//   src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
// }));

const verticalImages = [
  [400, 300],
  [400, 500],
  [400, 350],
  [400, 350],
  [400, 400],
  [400, 400],
  [400, 350],
  [400, 800],
];

const horizontalImages = [
  [600, 400],
  [500, 400],
  [700, 400],
  [1800, 250],
  [200, 350],
  [500, 350],
  [1100, 350],
  [900, 200],
  [900, 200],
];

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
        {verticalImages.map(([w, h], index) => (
          <span className={`rc-w-${w} rc-h-${h}`} key={index}>
            <img
              alt="Image 1"
              src={`https://picsum.photos/id/${index * 10 + 1}/${w}/${h}`}
            />
          </span>
        ))}
      </Masonry>

      <Masonry fillMode="HORIZONTAL" height={1200} width={1800}>
        {horizontalImages.map(([w, h], index) => (
          <span className={`rc-w-${w} rc-h-${h}`} key={index}>
            <img
              alt="Image 1"
              src={`https://picsum.photos/id/${index * 10 + 1}/${w}/${h}`}
            />
          </span>
        ))}
      </Masonry>
    </div>
  );
}

export default App;
