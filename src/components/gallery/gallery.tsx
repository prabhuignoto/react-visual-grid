import cx from "classnames";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";
import useSetup from "../../effects/useSetup";
import { ActionType, Controls } from "../controls/controls";
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
  imageSizes = {
    "1X": {
      width: 120,
      height: 100,
    },
    "2X": {
      width: 200,
      height: 180,
    },
    "3X": {
      width: 320,
      height: 280,
    },
  },
}) => {
  const imagesRef = useRef(images.map((image) => ({ ...image })));

  const {
    columns,
    containerStyle,
    fullScreen,
    hideImages,
    onRef,
    rows,
    style,
    windowRegion,
    wrapperStyle,
    resizeImages,
  } = useSetup({
    mode,
    imageDimensions,
    gridDimensions,
    width,
    height,
    scrollDir,
    gap,
    totalImages: images.length,
  });

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

  const galleryClass = useMemo(
    () => cx(styles.gallery, styles[scrollDir]),
    [scrollDir, hideImages]
  );

  const wrapperClass = useMemo(
    () =>
      cx(
        scrollDir === "vertical" ? styles.vertical : styles.horizontal,
        styles.wrapper
      ),
    [scrollDir]
  );

  const screenClass = useMemo(
    () =>
      cx(
        styles.screen,
        hideImages !== null ? (hideImages ? styles.show : styles.hide) : ""
      ),
    [hideImages]
  );

  const handleAction = (type: ActionType) => {
    if (type === "FULL_SCREEN") {
      fullScreen();
    } else if (type === "1X" || type === "2X" || type == "3X") {
      const { width, height } = imageSizes[type];
      resizeImages({ width, height });
    }
  };

  return (
    <div style={wrapperStyle} ref={onRef} className={wrapperClass}>
      <div className={styles.container} style={containerStyle}>
        <div className={screenClass}></div>
        <ul className={galleryClass} style={style}>
          {records.map((image, index) => (
            <li key={image.id} className={styles.gallery_item}>
              <Image
                src={image.src}
                alt={image.alt}
                width={imageDimensions.width - gap}
                height={imageDimensions.height - gap}
              />
              {/* <span style={{ color: "#fff" }}>{image.id}</span> */}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.controls_wrapper}>
        <Controls onAction={handleAction} />
      </div>
    </div>
  );
};

export { Gallery };
