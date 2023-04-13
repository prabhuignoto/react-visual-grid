import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  defaultImageSizes,
  ImageDimensions,
  Theme,
  ZoomLevel,
} from "../components/grid/grid.model";
import { Dark, White } from "./../components/grid/themes";
import { useSetupFunctionType } from "./models";
import useResize from "./useResize";
import useScroll from "./useScroll";
import { useStyle } from "./useStyle";
import useTheme from "./useTheme";

const useSetup: useSetupFunctionType = ({
  mode,
  imageSizes = defaultImageSizes,
  gridDimensions = { columns: 4 },
  width = 0,
  height = 0,
  gridLayout,
  gap = 10,
  totalImages = 0,
  theme,
  dragRef,
}) => {
  // state for managing the rows and columns of the gallery
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  const [activeImageZoomLevel, setActiveImageZoomLevel] = useState<ZoomLevel>(
    "2X"
  );

  // reference to the gallery container
  const galleryRef = useRef<HTMLElement | null>(null);

  const [isResized, setIsResized] = useState(false);

  const [containerDimensions, setContainerDimensions] = useState<{
    width?: number;
    height?: number;
  }>({ height, width });

  const [rootDimensions, setRootDimensions] = useState<{
    width: number;
    height: number;
  }>({
    height,
    width,
  });

  const [imageDims, setImageDims] = useState<ImageDimensions>({
    height: imageSizes[activeImageZoomLevel].height,
    width: imageSizes[activeImageZoomLevel].width,
  });

  // tracks if the gallery is in fullscreen mode
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // used for temporarily hiding the images
  const [hideImages, setHideImages] = useState<boolean | null>(null);

  const [activeTheme, setActiveTheme] = useState<Theme | undefined>(theme);

  useTheme(galleryRef.current, activeTheme);

  useResize({
    dragRef,
    onResizeEnded: (d) => {
      setHideImages(false);
      const { height, width } = d;
      setIsResized(false);

      if (height && width) {
        setRootDimensions({
          height,
          width,
        });
        setContainerDimensions({
          height,
          width,
        });
      }
    },
    onResizeStarted: () => {
      setHideImages(true);
      setIsResized(true);
      setRegion({
        regionBottom: -1,
        regionTop: -1,
      });
    },
    target: galleryRef.current,
  });

  const {
    scrollPositions,
    region = { regionBottom: 0, regionTop: 0 },
    setRegion,
    isScrolled,
    startReached,
    endReached,
    scrollPercent,
    scrollToTop,
    scrollToBottom,
  } = useScroll({
    fullScreen: isFullScreen,
    gridLayout,
    imageDimensions: imageDims,
    ref: galleryRef,
    resizeStarted: isResized,
    zoomLevel: activeImageZoomLevel,
  });

  const { wrapperStyle, galleryStyle } = useStyle({
    columns,
    gap,
    gridLayout,
    imageDimensions: imageDims,
    isFullScreen,
    isResized,
    mode,
    region,
    rootDimensions,
    rows,
  });

  const init = () => {
    const node = galleryRef.current;
    const { width: imageWidth, height: imageHeight } = imageDims;
    const { width: rootWidth, height: rootHeight } = rootDimensions;

    if (node && mode === "auto" && rootWidth && rootHeight) {
      const cols = Math.floor((rootWidth as number) / imageWidth);
      const rows = Math.floor(((rootHeight as number) - 120) / imageHeight);

      if (gridLayout === "vertical") {
        setColumns(cols);
        setRows(Math.round(totalImages / cols));
        setRegion((prev) => ({
          ...prev,
          regionBottom: Math.round(rootHeight / imageHeight),
        }));
      } else if (gridLayout === "horizontal") {
        setRows(rows);
        setColumns(Math.round(rootWidth / imageWidth));
        setRegion((prev) => ({
          ...prev,
          regionBottom: Math.round(rootWidth / imageWidth),
        }));
      }
    }
  };

  useEffect(() => {
    const { width, height } = rootDimensions;

    if (width && height) {
      setHideImages(true);

      setTimeout(() => {
        init();
        setHideImages(false);
      }, 250);
    }
  }, [
    rootDimensions.width,
    rootDimensions.height,
    imageDims.width,
    imageDims.height,
  ]);

  const onRef = useCallback((node: HTMLDivElement) => {
    galleryRef.current = node;
    init();
  }, []);

  const resetPosition = useCallback(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollTo(0, 0);
      setRegion({
        regionBottom: -1,
        regionTop: -1,
      });
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (activeTheme?.backgroundColor === "#000") {
      setActiveTheme(White);
    } else {
      setActiveTheme(Dark);
    }
  }, [activeTheme?.backgroundColor]);

  const fullScreen = () => {
    resetPosition();

    if (galleryRef.current) {
      if (!isFullScreen) {
        const { innerHeight: height, innerWidth: width } = window;
        setIsFullScreen(true);
        setRootDimensions({
          height,
          width,
        });
        setContainerDimensions({
          height,
          width,
        });

        document.body.style.overflow = "hidden";
      } else {
        setIsFullScreen(false);
        setRootDimensions({
          height,
          width,
        });
        setContainerDimensions({
          height,
          width,
        });

        document.body.style.overflow = "auto";
      }
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      resetPosition();
    }
  }, [activeImageZoomLevel]);

  const resizeImages = (z: ZoomLevel) => {
    if (z !== activeImageZoomLevel) {
      const { width, height } = imageSizes[z];
      setHideImages(true);
      setActiveImageZoomLevel(z);
      setImageDims({
        height,
        width,
      });
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      const { height, width } = imageDims;

      if (gridLayout === "vertical") {
        const newHeight = rows * height;
        const addHeight = Math.max(
          ...Object.keys(imageSizes).map(
            (x) => imageSizes[x as ZoomLevel].height
          )
        );

        setContainerDimensions({
          height: newHeight + addHeight,
        });
      } else {
        const newWidth = Math.round(totalImages / rows) * width;
        setContainerDimensions({
          width: newWidth,
        });
      }
    }
  }, [rows, columns, imageDims.width, imageDims.height]);

  const isDarkMode = useMemo(() => activeTheme?.backgroundColor === "#000", [
    activeTheme?.backgroundColor,
  ]);

  return {
    activeZoomLevel: activeImageZoomLevel,
    columns,
    containerDimensions,
    endReached,
    fullScreen,
    hideImages,
    isDark: isDarkMode,
    isFullScreen,
    isResized,
    isScrolled,
    onRef,
    resizeImages,
    rootDimensions,
    rows,
    scrollPercent,
    scrollPositions,
    scrollToBottom,
    scrollToTop,
    startReached,
    style: galleryStyle,
    toggleTheme,
    windowRegion: region,
    wrapperStyle,
  };
};

export default useSetup;
