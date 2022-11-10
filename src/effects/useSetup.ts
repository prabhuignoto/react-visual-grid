import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import {
  defaultImageSizes,
  ImageDimensions,
  ZoomLevel,
} from "../components/gallery/gallery.model";
import { useSetupFunctionType } from "./models";
import useScroll from "./useScroll";
import { useStyle } from "./useStyle";

const useSetup: useSetupFunctionType = ({
  mode,
  imageSizes = defaultImageSizes,
  gridDimensions = { columns: 4 },
  width = 0,
  height = 0,
  scrollDir,
  gap = 10,
  totalImages = 0,
}) => {
  // state for managing the rows and columns of the gallery
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  const [activeImageZoomLevel, setActiveImageZoomLevel] =
    useState<ZoomLevel>("2X");

  // reference to the gallery container
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({});

  const [rootDimensions, setRootDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width,
    height,
  });

  const [imageDims, setImageDims] = useState<ImageDimensions>({
    width: imageSizes[activeImageZoomLevel].width,
    height: imageSizes[activeImageZoomLevel].height,
  });

  // tracks if the gallery is in fullscreen mode
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // used for temporarily hiding the images
  const [hideImages, setHideImages] = useState<boolean | null>(null);

  const {
    scrollPositions,
    region = { upperBound: 0, lowerBound: 0 },
    setRegion,
  } = useScroll({
    ref: galleryRef,
    imageDimensions: imageDims,
    scrollDir,
  });

  const { wrapperStyle, galleryStyle } = useStyle({
    rootDimensions,
    imageDimensions: imageDims,
    scrollDir,
    region,
    columns,
    rows,
    gap,
    mode,
    isFullScreen,
  });

  const init = () => {
    const node = galleryRef.current;
    const { width: imageWidth, height: imageHeight } = imageDims;
    const { width: wrapperWidth, height: wrapperHeight } = rootDimensions;

    if (node && mode === "auto" && wrapperWidth && wrapperHeight) {
      const cols = Math.floor((wrapperWidth as number) / imageWidth);
      const rows = Math.floor((wrapperHeight as number) / imageHeight);

      if (scrollDir === "vertical") {
        setColumns(cols);
        setRows(Math.round(totalImages / cols));
        setRegion((prev) => ({
          ...prev,
          lowerBound: Math.round(wrapperHeight / imageHeight),
        }));
      } else if (scrollDir === "horizontal") {
        setRows(rows);
        setColumns(Math.round(wrapperWidth / imageWidth));
        setRegion((prev) => ({
          ...prev,
          lowerBound: Math.round(wrapperWidth / imageWidth),
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
      }, 500);
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

  const fullScreen = () => {
    if (galleryRef.current) {
      if (!isFullScreen) {
        const { innerHeight, innerWidth } = window;

        setRootDimensions({
          height: innerHeight,
          width: innerWidth,
        });
        setIsFullScreen(true);
        document.body.style.overflow = "hidden";
      } else {
        setRootDimensions({
          height,
          width,
        });
        setIsFullScreen(false);
        document.body.style.overflow = "auto";
      }
    }
  };

  const resizeImages = (z: ZoomLevel) => {
    if (z !== activeImageZoomLevel) {
      setHideImages(true);
      setActiveImageZoomLevel(z);

      const { width, height } = imageSizes[z];

      setImageDims({
        width,
        height,
      });
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      const { height, width } = imageDims;

      if (scrollDir === "vertical") {
        const newHeight = rows * height + "px";
        setContainerStyle({
          height: newHeight,
        });
      } else {
        const newWidth = Math.round(totalImages / rows) * width + "px";
        setContainerStyle({
          width: newWidth,
        });
      }
    }
  }, [rows, columns, imageDims.width, imageDims.height]);

  return {
    activeZoomLevel: activeImageZoomLevel,
    columns,
    containerStyle,
    fullScreen,
    hideImages,
    onRef,
    resizeImages,
    rows,
    style: galleryStyle,
    windowRegion: region,
    wrapperStyle,
    scrollPositions,
  };
};

export default useSetup;
