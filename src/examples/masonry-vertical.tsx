/* eslint-disable jsx-a11y/img-redundant-alt */
import { Masonry } from "../react-visual-grid";
import { images, verticalImages } from "./data";

export const MasonryVertical = () => {
  return (
    <Masonry
      animationDelay={400}
      fillMode="VERTICAL"
      gutter={10}
      height={1200}
      width={1800}
    >
      {verticalImages.map(([w, h], index) => (
        <span className={`rc-w-${w} rc-h-${h}`} key={index}>
          <img
            alt="Image 1"
            src={`https://picsum.photos/id/${index * 10 + 1}/${w}/${h}`}
          />
        </span>
      ))}
    </Masonry>
  );
};

export const MasonryVerticalSimple = () => {
  return (
    <Masonry
      animationDelay={400}
      fillMode="VERTICAL"
      gutter={10}
      height={1200}
      width={1200}
    >
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
  );
};
