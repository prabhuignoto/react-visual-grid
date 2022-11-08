import cx from "classnames";
import { FunctionComponent, useMemo, useRef } from "react";
import useSetup from "../../effects/useSetup";
import { Image } from "../image/image";
import { GalleryProps } from "./gallery.model";
import styles from "./gallery.module.scss";

const Gallery: FunctionComponent<GalleryProps> = ({
  images,
  width = 1200,
  height = 600,
  scrollDir = "vertical",
  imageDimensions = { width: 60, height: 40 },
  gridDimensions = {
    columns: 3,
  },
  gap = 20,
  mode = "auto",
}) => {
  const imagesRef = useRef(images.map((image) => ({ ...image })));

  const { style, onRef, windowRegion, columns, wrapperStyle, rows } = useSetup({
    mode,
    imageDimensions,
    gridDimensions,
    width,
    height,
    scrollDir,
    gap,
    totalImages: images.length,
  });

  const visibleImages = useMemo(
    () => (windowRegion.lowerBound - windowRegion.upperBound - 1) * rows,
    [rows, windowRegion.upperBound, windowRegion.lowerBound]
  );

  console.log(visibleImages);

  const records = useMemo(() => {
    const { upperBound, lowerBound } = windowRegion;
    if (scrollDir === "vertical") {
      return imagesRef.current.filter(
        (_, index) =>
          Math.floor(index / columns) >= upperBound &&
          Math.floor(index / columns) <= lowerBound
      );
    } else {
      return imagesRef.current.filter((_, index) => {
        return index >= upperBound * rows && index <= rows * lowerBound - 1;
      });
    }
  }, [windowRegion.upperBound, windowRegion.lowerBound, rows, columns]);

  // console.log(windowRegion);

  const galleryClass = useMemo(
    () => cx(styles.gallery, styles[scrollDir]),
    [scrollDir]
  );

  return (
    <div style={wrapperStyle} ref={onRef} className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={galleryClass} style={style}>
          {records.map((image, index) => (
            <li key={image.id} className={styles.gallery_item}>
              <Image
                src={image.src}
                alt={image.alt}
                width={imageDimensions.width - gap}
                height={imageDimensions.height - gap}
              />
              <span style={{ color: "#fff" }}>{image.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Gallery };
