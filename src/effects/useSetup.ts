import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { ImageDimensions } from "../components/gallery/gallery.model";
import { Region, useSetupFunctionType } from "./models";

const useSetup: useSetupFunctionType = ({
  mode,
  imageDimensions = { width: 200, height: 180 },
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
    width: imageDimensions.width,
    height: imageDimensions.height,
  });

  // tracks if the gallery is in fullscreen mode
  const isFullScreen = useRef<Boolean>(false);

  // used for temporarily hiding the images
  const [hideImages, setHideImages] = useState<boolean | null>(null);

  // handler for the scroll event, computes the new upper bound and lower bound
  const handleScroll = useDebouncedCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { height, width } = imageDims;
    const { scrollLeft, scrollTop, clientHeight, clientWidth } = target;

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

  const gridSettings = useMemo<CSSProperties>(() => {
    const { width, height } = imageDims;
    const newWidth = width - gap;
    const newHeight = height - gap;

    if (mode === "auto") {
      if (scrollDir === "vertical") {
        return {
          gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
        };
      } else {
        return {
          gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${newHeight}px)`,
          gridAutoFlow: "column",
        };
      }
    } else {
      return {
        gridTemplateColumns: `repeat(${columns}, ${newWidth}px)`,
      };
    }
  }, [mode, columns, imageDims.width, rows, imageDims.height]);

  const galleryStyle = useMemo<CSSProperties>(() => {
    if (!galleryRef.current) {
      return {};
    }

    let autoProps = {};
    const { height, width } = imageDims;

    if (scrollDir === "vertical") {
      autoProps = {
        gridAutoRows: `${height - gap}px`,
        top: region.upperBound * imageDims.height + "px",
      };
    } else {
      autoProps = {
        gridAutoColumns: `${width - gap}px`,
        left: region.upperBound * imageDims.width + "px",
      };
    }

    return {
      ...gridSettings,
      ...autoProps,
      gap: `${gap}px`,
    };
  }, [
    columns,
    gridSettings,
    region.upperBound,
    galleryRef,
    scrollDir,
    imageDims.width,
    imageDims.height,
  ]);

  const wrapperStyle = useMemo<CSSProperties>(() => {
    let dimensions = {};
    const { width, height } = wrapperDimensions;

    if (mode === "auto") {
      dimensions = {
        width: `${width}px`,
        height: `${height}px`,
      };
    }

    return {
      ...dimensions,
      [`overflow${scrollDir === "vertical" ? "Y" : "X"}`]: "auto",
    };
  }, [wrapperDimensions.width, wrapperDimensions.height, scrollDir, mode]);

  const init = () => {
    const node = galleryRef.current;
    const { width: imageWidth, height: imageHeight } = imageDims;
    const { width: wrapperWidth, height: wrapperHeight } = wrapperDimensions;

    console.log(imageDims);

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
      }, 500);
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
      if (!isFullScreen.current) {
        const { innerHeight, innerWidth } = window;

        setWrapperDimensions({
          height: innerHeight,
          width: innerWidth,
        });
        isFullScreen.current = true;
        document.body.style.overflow = "hidden";
      } else {
        setWrapperDimensions({
          height,
          width,
        });
        isFullScreen.current = false;
        document.body.style.overflow = "auto";
      }
    }
  };

  const resizeImages = ({ width, height }: ImageDimensions) => {
    setImageDims({
      width,
      height,
    });
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
    columns,
    onRef,
    rows,
    style: galleryStyle,
    windowRegion: region,
    wrapperStyle,
    containerStyle,
    fullScreen,
    hideImages,
    resizeImages,
  };
};

export default useSetup;
