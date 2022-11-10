import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  defaultImageSizes,
  ImageDimensions,
  ZoomLevel,
} from "../components/gallery/gallery.model";
import { Region, ScrollPositions, useSetupFunctionType } from "./models";
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

  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    scrollLeft: 0,
    scrollTop: 0,
  });

  // reference to the gallery container
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const [containerStyle, setContainerStyle] = useState<CSSProperties>({});

  const [region, setRegion] = useState<Region>({
    upperBound: 0,
    lowerBound: 0,
  });

  const [wrapperDimensions, setWrapperDimensions] = useState<{
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

  const { wrapperStyle, galleryStyle } = useStyle({
    wrapperDimensions,
    imageDimensions: imageDims,
    scrollDir,
    region,
    columns,
    rows,
    gap,
    mode,
    isFullScreen,
  });

  const handleScroll = useDebouncedCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { height, width } = imageDims;
    const { scrollLeft, scrollTop, clientHeight, clientWidth } = target;

    setScrollPositions({ scrollLeft, scrollTop });
    const upperBound =
      scrollDir === "vertical" ? scrollTop / height : scrollLeft / width;
    const lowerBound =
      scrollDir === "vertical"
        ? (scrollTop + clientHeight) / height
        : (scrollLeft + clientWidth) / width;

    setRegion({
      upperBound: Math.floor(upperBound),
      lowerBound: Math.ceil(lowerBound),
    });
  }, 100);

  const init = () => {
    const node = galleryRef.current;
    const { width: imageWidth, height: imageHeight } = imageDims;
    const { width: wrapperWidth, height: wrapperHeight } = wrapperDimensions;

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
    const { width, height } = wrapperDimensions;

    if (width && height) {
      setHideImages(true);
      setTimeout(() => {
        init();
        setHideImages(false);
      }, 400);
    }
  }, [
    wrapperDimensions.width,
    wrapperDimensions.height,
    imageDims.width,
    imageDims.height,
  ]);

  const onRef = useCallback((node: HTMLDivElement) => {
    galleryRef.current = node;
    init();
    node.addEventListener("scroll", handleScroll);
  }, []);

  const fullScreen = () => {
    if (galleryRef.current) {
      if (!isFullScreen) {
        const { innerHeight, innerWidth } = window;

        setWrapperDimensions({
          height: innerHeight,
          width: innerWidth,
        });
        setIsFullScreen(true);
        document.body.style.overflow = "hidden";
      } else {
        setWrapperDimensions({
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

  useEffect(() => {
    return () => {
      if (galleryRef.current) {
        // galleryRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
