import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
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
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
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
  const isFullScreen = useRef<Boolean>(false);

  const handleScroll = useDebouncedCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { height, width } = imageDimensions;
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
    const { width, height } = imageDimensions;
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
  }, [mode, columns, imageDimensions.width, rows]);

  const galleryStyle = useMemo<CSSProperties>(() => {
    if (!galleryRef.current) {
      return {};
    }

    let autoProps = {};
    const { height, width } = imageDimensions;

    if (scrollDir === "vertical") {
      autoProps = {
        gridAutoRows: `${height - gap}px`,
        top: region.upperBound * imageDimensions.height + "px",
      };
    } else {
      autoProps = {
        gridAutoColumns: `${width - gap}px`,
        left: region.upperBound * imageDimensions.width + "px",
      };
    }

    return {
      ...gridSettings,
      ...autoProps,
      gap: `${gap}px`,
    };
  }, [columns, gridSettings, region.upperBound, galleryRef, scrollDir]);

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

  const init = useCallback(() => {
    const node = galleryRef.current;

    const { width: imageWidth, height: imageHeight } = imageDimensions;
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
  }, [wrapperDimensions.height, wrapperDimensions.width]);

  useEffect(() => {
    const { width, height } = wrapperDimensions;

    if (width && height) {
      setTimeout(init, 500);
      // init();
    }
  }, [wrapperDimensions.width, wrapperDimensions.height]);

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
      } else {
        setWrapperDimensions({
          height,
          width,
        });
        isFullScreen.current = false;
      }
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      const { height, width } = imageDimensions;

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
  }, [rows, columns, imageDimensions.width, imageDimensions.height]);

  useEffect(() => {
    if (galleryRef.current) {
      // galleryRef.current.removeEventListener("scroll", handleScroll);
    }
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
  };
};

export default useSetup;
