import cx from "classnames";
import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import useSetup from "../../effects/useSetup";
import { Controls } from "../controls/controls";
import { ActionType } from "../controls/controls.model";
import { Image } from "../image/image";
import { ViewerContainer } from "../viewer/viewer";
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
    containerDimensions: { height: containerHeight, width: containerWidth },
    fullScreen,
    hideImages,
    onRef,
    resizeImages,
    rows,
    style,
    windowRegion: { regionTop, regionBottom },
    wrapperStyle,
    scrollPositions,
    isScrolled,
    isFullScreen,
    rootDimensions: { height: rootHeight, width: rootWidth },
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
    if (scrollDir === "vertical") {
      return imagesRef.current.filter(
        (_, index) =>
          Math.floor(index / columns) >= regionTop &&
          Math.floor(index / columns) <= regionBottom
      );
    } else {
      return imagesRef.current.filter((_, index) => {
        return index >= regionTop * rows && index <= rows * regionBottom - 1;
      });
    }
  }, [regionTop, regionBottom, rows, columns]);

  const containerRef = useRef<null | HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState("");

  const onContainerRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      containerRef.current = node;
    }
  }, []);

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

  const containerStyle = useMemo(() => {
    return {
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
    };
  }, [containerWidth, containerHeight]);

  const handleImageClick = (src: string) => {
    setActiveImage(src);
  };

  return (
    <div style={wrapperStyle} ref={onRef} className={wrapperClass}>
      <div
        className={styles.container}
        style={containerStyle}
        ref={onContainerRef}
      >
        <div className={screenClass}></div>
        <ul className={galleryClass} style={style}>
          {records.map((image) => (
            <li key={image.id} className={styles.gallery_item}>
              <Image
                src={image.src}
                alt={image.alt}
                width={getImageDimensions.width}
                height={getImageDimensions.height}
                onClick={handleImageClick}
              />
            </li>
          ))}
        </ul>
      </div>
      <Controls
        onAction={handleAction}
        activeZoom={activeZoomLevel}
        isScrolled={isScrolled}
        scrollDir={scrollDir}
        rootHeight={!isFullScreen ? height : rootHeight}
        rootWidth={!isFullScreen ? width : rootWidth}
        scrollPositions={scrollPositions}
        hide={isScrolled}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
      <ViewerContainer
        url={activeImage}
        isFullScreen={isFullScreen}
        node={containerRef.current}
      />
    </div>
  );
};

export { Gallery };
