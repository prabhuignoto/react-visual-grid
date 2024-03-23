import cx from "classnames";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { generateUniqueId, isStringPercent, stringToNumber } from "../../common/utils";
import useSetup from "../../effects/useSetup";
import { Context, defaultProps } from "../context";
import { Controls } from "../controls/controls";
import { ActionType } from "../controls/controls.model";
import { Image } from "../image/image";
import { Screen } from "../screen/screen";
import { ViewerContainer } from "../viewer/viewer";
import { defaultImageSizes, GridProps, Position } from "./grid.model";
import styles from "./grid.module.scss";
import { Dark } from "./themes";

const Grid: FunctionComponent<GridProps> = (props) => {
  const contextProps = Object.assign({}, defaultProps, props);

  const resizeRef = useRef<HTMLElement>(null);

  const {
    images = [],
    width = 1200,
    height = 600,
    gridLayout = "vertical",
    gridDimensions = {
      columns: 3,
    },
    gap = 20,
    mode = "auto",
    imageSizes = defaultImageSizes,
    theme,
    enableResize,
    enableDarkMode = false,
    submit,
  } = contextProps;

  const imagesRef = useRef(
    images.map((image) => ({ ...image, id: generateUniqueId() }))
  );

  const [transfDimensions] = useState<{ height: number; width: number }>(() => {
    if (isStringPercent(width) && isStringPercent(height)) {
      const { innerHeight, innerWidth } = window;

      const widthNum = stringToNumber(width as string);
      const heightNum = stringToNumber(height as string);

      return {
        height: Math.round(innerHeight * (heightNum / 100)),
        width: Math.round(innerWidth * (widthNum / 100)),
      };
    }

    return {
      height: +height,
      width: +width,
    };
  });

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
    startReached,
    rootDimensions: { height: rootHeight, width: rootWidth },
    isResized,
    toggleTheme,
    isDark,
  } = useSetup({
    dragRef: resizeRef.current,
    enableResize,
    gap,
    gridDimensions,
    gridLayout,
    height: transfDimensions.height,
    imageSizes,
    mode,
    theme: enableDarkMode ? Dark : theme,
    totalImages: images.length,
    width: transfDimensions.width,
  });

  const records = useMemo(() => {
    if (gridLayout === "vertical") {
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

  const galleryClass = useMemo(
    () => cx(styles.gallery, styles[gridLayout]),
    [gridLayout, hideImages, isResized]
  );

  const wrapperClass = useMemo(
    () =>
      cx(
        gridLayout === "vertical" ? styles.vertical : styles.horizontal,
        styles.wrapper,
        isResized ? styles.resized : ""
      ),
    [gridLayout, isResized]
  );

  const submitImages = () => {
    const images = imagesRef.current.filter((image) => image.selected);
    submit(images);
  };

  const handleAction = (type: ActionType) => {
    if (type === "FULL_SCREEN") {
      fullScreen();
    } else if (type === "1X" || type === "2X" || type === "3X") {
      resizeImages(type);
    } else if (type === "GO_UP") {
      scrollToTop();
    } else if (type === "GO_DOWN") {
      scrollToBottom();
    } else if (type === "TOGGLE_THEME") {
      toggleTheme();
    } else if (type === "SUBMIT") {
      submitImages();
    }
  };

  const getImageDimensions = useMemo(
    () => ({
      height: imageSizes[activeZoomLevel].height - gap,
      width: imageSizes[activeZoomLevel].width - gap,
    }),
    [activeZoomLevel]
  );

  const getRootDimensions = useMemo(
    () => ({
      rootHeight,
      rootWidth,
    }),
    [isFullScreen, rootHeight, rootWidth]
  );

  const containerStyle = useMemo(() => {
    return {
      height: `${containerHeight}px`,
      width: `${containerWidth}px`,
    };
  }, [containerWidth, containerHeight]);

  const handleImageClick = (src: string, id?: string, pos?: Position) => {
    const image = imagesRef.current.find((image) => image.id === id);
    image!.selected = !image!.selected;
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

  const galleryList = (
    <ul className={galleryClass} style={style}>
      {records.map((image, index) => (
        <li className={styles.gallery_item} key={image.id}>
          <Image
            alt={image.alt}
            height={getImageDimensions.height}
            id={image.id}
            index={index}
            onClick={handleImageClick}
            selected={image.selected}
            src={image.src}
            width={getImageDimensions.width}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <Context.Provider value={contextProps}>
      <div
        style={{
          height: getRootDimensions.rootHeight,
          position: "relative",
          width: getRootDimensions.rootWidth,
        }}
      >
        <div className={wrapperClass} ref={onRef} style={wrapperStyleMod}>
          {/* Gallery */}
          <div
            className={styles.container}
            ref={onContainerRef}
            style={containerStyle}
          >
            {/* <div className={screenClass}></div> */}
            <Screen
              height={getRootDimensions.rootHeight}
              show={hideImages || isResized}
              width={getRootDimensions.rootWidth}
            />
            {galleryList}
          </div>
          {/* Controls here */}
          <Controls
            activeZoom={activeZoomLevel}
            containerHeight={containerHeight}
            containerWidth={containerWidth}
            endReached={endReached}
            hide={isScrolled || isResized}
            isDark={isDark}
            isFullScreen={isFullScreen}
            isScrolled={isScrolled}
            onAction={handleAction}
            ref={resizeRef}
            rootHeight={getRootDimensions.rootHeight}
            rootWidth={getRootDimensions.rootWidth}
            scrollPercent={scrollPercent}
            scrollPositions={scrollPositions}
            startReached={startReached}
          />
          {/* Image viewer */}
          {activeImage ? (
            <ViewerContainer
              activeImageIndex={activeImageIndex}
              dimensions={{
                height: getRootDimensions.rootHeight,
                width: getRootDimensions.rootWidth,
              }}
              left={scrollPositions.scrollLeft}
              node={containerRef.current}
              onClose={onClose}
              onNext={handleNextImage}
              onPrevious={handlePreviousImage}
              rect={position}
              show={showViewer}
              top={scrollPositions.scrollTop}
              totalImages={images.length}
              url={activeImage}
            />
          ) : null}
        </div>
      </div>
    </Context.Provider>
  );
};

export { Grid };
