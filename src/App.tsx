/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./app.css";
import { Masonry } from "./react-visual-grid";

// generate random images array using lorem picsum api
const images = Array.from({ length: 50 }, (_, i) => ({
  alt: `Image ${i + 1}`,
  src: `https://picsum.photos/id/${Math.round(Math.random() * 110)}/800/600`,
}));

const verticalImages = [
  [200, 200],
  [200, 400],
  [200, 250],
  [200, 250],
  [200, 300],
  [200, 300],
  [200, 500],
  [200, 1100],
];

const horizontalImages = [
  [400, 400],
  [400, 400],
  [700, 400],
  [1700, 250],
  [200, 350],
  [400, 350],
  [900, 350],
  [700, 200],
  [800, 200],
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
      {/* <Masonry fillMode="VERTICAL" height={1200} width={1200}>
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
      </Masonry> */}
      {/* <Masonry fillMode="HORIZONTAL" height={500} width={300}>
        <span className={`rc-w-100 rc-h-100`}>
          <img alt="Image 1" src={`https://picsum.photos/id/10/100/100`} />
        </span>
        <span className={`rc-w-200 rc-h-100`}>
          <img alt="Image 1" src={`https://picsum.photos/id/11/100/100`} />
        </span>
        <span className={`rc-w-200 rc-h-100`}>
          <img alt="Image 1" src={`https://picsum.photos/id/13/200/100`} />
        </span>
        <span className={`rc-w-100 rc-h-100`}>
          <img alt="Image 1" src={`https://picsum.photos/id/14/100/100`} />
        </span>
        <span className={`rc-w-300 rc-h-150`}>
          <img alt="Image 1" src={`https://picsum.photos/id/15/200/100`} />
        </span>
      </Masonry> */}

      {/* generate a random mason grid using the Masonry react component with same image width but different height*/}

      <Masonry fillMode="VERTICAL" height={1200} width={1200}>
        {images.map((image, index) => {
          const height = Math.round(Math.random() * 500);
          return (
            <span className={`rc-w-350 rc-h-${height}`} key={index}>
              <img
                alt={image.alt}
                src={`https://picsum.photos/id/${Math.round(
                  Math.random() * 110
                )}/350/${height}`}
              />
            </span>
          );
        })}
      </Masonry>
    </div>
  );
}

export default App;
