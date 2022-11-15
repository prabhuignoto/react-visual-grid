import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [activeImageZoomLevel, setActiveImageZoomLevel] = useState<ZoomLevel>(
    "2X"
  );

  // reference to the gallery container
  const galleryRef = useRef<HTMLElement | null>(null);

  const [containerDimensions, setContainerDimensions] = useState<{
    width?: number;
    height?: number;
  }>({ width, height });

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
    region = { regionTop: 0, regionBottom: 0 },
    setRegion,
    isScrolled,
    endReached,
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
    endReached,
  });

  const init = () => {
    const node = galleryRef.current;
    const { width: imageWidth, height: imageHeight } = imageDims;
    const { width: rootWidth, height: rootHeight } = rootDimensions;

    if (node && mode === "auto" && rootWidth && rootHeight) {
      const cols = Math.floor((rootWidth as number) / imageWidth);
      const rows = Math.floor((rootHeight as number) / imageHeight);

      if (scrollDir === "vertical") {
        setColumns(cols);
        setRows(Math.round(totalImages / cols));
        setRegion((prev) => ({
          ...prev,
          regionBottom: Math.round(rootHeight / imageHeight),
        }));
      } else if (scrollDir === "horizontal") {
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
        regionTop: 0,
        regionBottom: 0,
      });
    }
  }, []);

  const fullScreen = () => {
    resetPosition();

    if (galleryRef.current) {
      if (!isFullScreen) {
        const { innerHeight: height, innerWidth: width } = window;
        setIsFullScreen(true);
        startTransition(() => {
          setRootDimensions({
            height,
            width,
          });
          setContainerDimensions({
            height,
            width,
          });
        });

        document.body.style.overflow = "hidden";
      } else {
        setIsFullScreen(false);
        startTransition(() => {
          setRootDimensions({
            height,
            width,
          });
          setContainerDimensions({
            height,
            width,
          });
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
        width,
        height,
      });
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      const { height, width } = imageDims;

      if (scrollDir === "vertical") {
        const newHeight = rows * height;
        const addHeight = Math.max(
          ...Object.keys(imageSizes).map((x) => imageSizes[x].height)
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

  return {
    activeZoomLevel: activeImageZoomLevel,
    columns,
    containerDimensions,
    fullScreen,
    hideImages,
    onRef,
    resizeImages,
    rows,
    style: galleryStyle,
    windowRegion: region,
    wrapperStyle,
    scrollPositions,
    isScrolled,
    isFullScreen,
    rootDimensions,
  };
};

export default useSetup;
