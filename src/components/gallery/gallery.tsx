import cx from "classnames";
import { nanoid } from "nanoid";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useSetup from "../../effects/useSetup";
import { Context, defaultProps } from "../context";
import { Controls } from "../controls/controls";
import { ActionType } from "../controls/controls.model";
import { Image } from "../image/image";
import { ViewerContainer } from "../viewer/viewer";
import { defaultImageSizes, GalleryProps, Position } from "./gallery.model";
import styles from "./gallery.module.scss";

const Gallery: FunctionComponent<GalleryProps> = (props) => {
  const contextProps = Object.assign({}, defaultProps, props);

  const {
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
    theme,
  } = contextProps;

  const imagesRef = useRef(images.map((image) => ({ ...image, id: nanoid() })));

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
    scrollPercent,
    scrollToTop,
    scrollToBottom,
    endReached,
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
    theme,
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

  const containerRef = useRef<null | Element | HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState("");
  const [showViewer, setShowViewer] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [activeImageIndex, setActiveImageIndex] = useState(-1);

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
    } else if (type === "GO_UP") {
      scrollToTop();
    } else if (type === "GO_DOWN") {
      scrollToBottom();
    }
  };

  const getImageDimensions = useMemo(
    () => ({
      width: imageSizes[activeZoomLevel].width - gap,
      height: imageSizes[activeZoomLevel].height - gap,
    }),
    [activeZoomLevel]
  );

  const getRootDimensions = useMemo(
    () => ({
      rootHeight: !isFullScreen ? height : rootHeight,
      rootWidth: !isFullScreen ? width : rootWidth,
    }),
    [isFullScreen, rootHeight, rootWidth]
  );

  const containerStyle = useMemo(() => {
    return {
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
    };
  }, [containerWidth, containerHeight]);

  const handleImageClick = (src: string, id?: string, pos?: Position) => {
    setShowViewer(true);
    const index = imagesRef.current.findIndex((image) => image.id === id);
    setActiveImageIndex(index || 0);
    pos && setPosition(pos);
  };

  const onClose = () => {
    setShowViewer(false);
    setActiveImage("");
  };

  const handlePreviousImage = useCallback(() => {
    if (activeImageIndex > 0) {
      setActiveImageIndex((prev) => prev - 1);
    }
  }, [activeImageIndex]);

  const handleNextImage = useCallback(() => {
    if (activeImageIndex < images.length - 1) {
      setActiveImageIndex((prev) => prev + 1);
    }
  }, [activeImageIndex]);

  useEffect(() => {
    if (activeImageIndex > -1) {
      setActiveImage(images[activeImageIndex].src);
    }
  }, [activeImageIndex]);

  const wrapperStyleMod = useMemo(
    () =>
      Object.assign({}, wrapperStyle, showViewer ? { overflow: "hidden" } : {}),
    [showViewer, wrapperStyle]
  );

  const galleryList = useMemo(() => {
    return (
      <ul className={galleryClass} style={style}>
        {records.map((image, index) => (
          <li key={image.id} className={styles.gallery_item}>
            <Image
              src={image.src}
              alt={image.alt}
              width={getImageDimensions.width}
              height={getImageDimensions.height}
              onClick={handleImageClick}
              index={index}
              id={image.id}
            />
          </li>
        ))}
      </ul>
    );
  }, [records.length, regionTop, regionBottom]);

  return (
    <Context.Provider value={contextProps}>
      <div style={wrapperStyleMod} ref={onRef} className={wrapperClass}>
        <div
          className={styles.container}
          style={containerStyle}
          ref={onContainerRef}
        >
          <div className={screenClass}></div>
          {galleryList}
        </div>
        <Controls
          onAction={handleAction}
          activeZoom={activeZoomLevel}
          isScrolled={isScrolled}
          rootHeight={getRootDimensions.rootHeight}
          rootWidth={getRootDimensions.rootWidth}
          scrollPositions={scrollPositions}
          hide={isScrolled}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          isFullScreen={isFullScreen}
          scrollPercent={scrollPercent}
          endReached={endReached}
        />
        {activeImage ? (
          <ViewerContainer
            url={activeImage}
            node={containerRef.current}
            onClose={onClose}
            dimensions={{
              height: getRootDimensions.rootHeight,
              width: getRootDimensions.rootWidth,
            }}
            show={showViewer}
            rect={position}
            top={scrollPositions.scrollTop}
            left={scrollPositions.scrollLeft}
            onPrevious={handlePreviousImage}
            onNext={handleNextImage}
            activeImageIndex={activeImageIndex}
            totalImages={images.length}
          />
        ) : null}
      </div>
    </Context.Provider>
  );
};

export { Gallery };
