import cx from "classnames";
import { CSSProperties, FunctionComponent, useMemo, useRef } from "react";
import useSetup from "../../effects/useSetup";
import { ActionType, Controls } from "../controls/controls";
import { Image } from "../image/image";
import { defaultImageSizes, GalleryProps } from "./gallery.model";
import styles from "./gallery.module.scss";

const Gallery: FunctionComponent<GalleryProps> = ({
  images = [],
  width = 1200,
  height = 600,
  scrollDir = "vertical",
  gridDimensions = {
    columns: 3,
  },
  gap = 20,
  mode = "auto",
  imageSizes = defaultImageSizes,
}) => {
  const imagesRef = useRef(images.map((image) => ({ ...image })));

  const {
    activeZoomLevel,
    columns,
    containerStyle,
    fullScreen,
    hideImages,
    onRef,
    resizeImages,
    rows,
    style,
    windowRegion,
    wrapperStyle,
    scrollPositions,
    isScrolled,
  } = useSetup({
    mode,
    imageSizes,
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

  const galleryClass = useMemo(() => cx(styles.gallery, styles[scrollDir]), [
    scrollDir,
    hideImages,
  ]);

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
    } else if (type === "1X" || type === "2X" || type === "3X") {
      resizeImages(type);
    }
  };

  const getImageDimensions = useMemo(
    () => ({
      width: imageSizes[activeZoomLevel].width - gap,
      height: imageSizes[activeZoomLevel].height - gap,
    }),
    [activeZoomLevel]
  );

  console.log("hide", hideImages);

  const controlWrapperStyle = useMemo<CSSProperties>(() => {
    const { scrollLeft, scrollTop } = scrollPositions;

    let style = {
      [scrollDir === "vertical" ? "top" : "left"]:
        scrollDir === "horizontal"
          ? `${scrollLeft + width / 2 - 150}px`
          : `${scrollTop + height - 100}px`,
    };

    if (scrollLeft) {
      style = {
        left: `${scrollLeft + width / 2 - 150}px`,
      };
    } else if (scrollTop) {
      style = {
        top: `${scrollTop + height - 100}px`,
      };
    }
    return style;
  }, [scrollPositions?.scrollTop, scrollPositions?.scrollLeft, height, width]);

  const controlWrapperClass = useMemo(
    () => cx(styles.controls_wrapper, hideImages ? styles.hide : ""),
    [hideImages]
  );

  return (
    <div style={wrapperStyle} ref={onRef} className={wrapperClass}>
      <div className={styles.container} style={containerStyle}>
        <div className={screenClass}></div>
        <ul className={galleryClass} style={style}>
          {records.map((image) => (
            <li key={image.id} className={styles.gallery_item}>
              <Image
                src={image.src}
                alt={image.alt}
                width={getImageDimensions.width}
                height={getImageDimensions.height}
              />
            </li>
          ))}
        </ul>
      </div>
      {!isScrolled ? (
        <div
          className={controlWrapperClass}
          style={
            scrollDir === "horizontal"
              ? { width: containerStyle.width }
              : controlWrapperStyle
          }
        >
          <Controls
            onAction={handleAction}
            activeZoom={activeZoomLevel}
            style={scrollDir === "horizontal" ? controlWrapperStyle : {}}
          />
        </div>
      ) : null}
    </div>
  );
};

export { Gallery };
