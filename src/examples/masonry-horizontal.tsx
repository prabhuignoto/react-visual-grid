/* eslint-disable jsx-a11y/img-redundant-alt */
import { Masonry } from "../react-visual-grid";
import { horizontalImages } from "./data";

export const MasonryHorizontal = () => {
  return (
    <Masonry
      animationDelay={500}
      fillMode="HORIZONTAL"
      gutter={1}
      height={1400}
      width={1800}
    >
      {horizontalImages.map(([w, h], index) => (
        <span className={`rc-w-${w} rc-h-${h}`} key={index}>
          <img
            alt="Image 1"
            src={`https://source.unsplash.com/random/${w}x${h}?space`}
          />
        </span>
      ))}
    </Masonry>
  );
};

export const MasonryHorizontalSimple = () => {
  return (
    <Masonry fillMode="HORIZONTAL" height={700} width={600}>
      <span className={`rc-w-100 rc-h-`}>
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
        <img alt="Image 1" src={`https://picsum.photos/id/15/300/150`} />
      </span>
      <span className={`rc-w-180 rc-h-150`}>
        <img alt="Image 1" src={`https://picsum.photos/id/23/180/150`} />
      </span>
      <span className={`rc-w-120 rc-h-150`}>
        <img alt="Image 1" src={`https://picsum.photos/id/154/120/150`} />
      </span>
      <span className={`rc-w-160 rc-h-200`}>
        <img alt="Image 1" src={`https://picsum.photos/id/215/160/200`} />
      </span>
      <span className={`rc-w-440 rc-h-200`}>
        <img alt="Image 1" src={`https://picsum.photos/id/77/440/200`} />
      </span>
      <span className={`rc-w-600 rc-h-`}>
        <img alt="Image 1" src={`https://picsum.photos/id/162/600/200`} />
      </span>
    </Masonry>
  );
};
