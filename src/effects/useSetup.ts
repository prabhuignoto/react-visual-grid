import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { GalleryProps } from "../components/gallery/gallery.model";

type Options = Pick<
  GalleryProps,
  | "mode"
  | "imageDimensions"
  | "gridDimensions"
  | "width"
  | "height"
  | "scrollDir"
  | "gap"
  | "totalImages"
>;

type Region = { upperBound: number; lowerBound: number };

const useSetup: (options: Options) => {
  style: CSSProperties;
  wrapperStyle: CSSProperties;
  onRef: (node: HTMLDivElement) => void;
  windowRegion: Region;
  columns: number;
  rows: number;
} = ({
  mode,
  imageDimensions = { width: 200, height: 180 },
  gridDimensions = { columns: 4 },
  width,
  height,
  scrollDir,
  gap = 10,
  totalImages = 0,
}) => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const [region, setRegion] = useState<Region>({
    upperBound: 0,
    lowerBound: 0,
  });

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
  }, [width, height, scrollDir, mode]);

  const onRef = useCallback(
    (node: HTMLDivElement) => {
      const { width: imageWidth, height: imageHeight } = imageDimensions;
      galleryRef.current = node;

      if (node && mode === "auto" && imageWidth && imageHeight) {
        const { clientWidth, clientHeight } = node;

        const cols = Math.floor(clientWidth / imageWidth);
        const rows = Math.floor(clientHeight / imageHeight);

        if (scrollDir === "vertical") {
          setColumns(cols);
          setRows(Math.round(totalImages / cols));
          setRegion((prev) => ({
            ...prev,
            lowerBound: Math.round(node.clientHeight / imageHeight),
          }));
        } else if (scrollDir === "horizontal") {
          setRows(rows);
          setColumns(Math.round(totalImages / rows));
          setRegion((prev) => ({
            ...prev,
            lowerBound: Math.round(node.clientWidth / imageWidth),
          }));
        }

        node.addEventListener("scroll", handleScroll);
      }
    },
    [imageDimensions?.width, imageDimensions?.height, totalImages, scrollDir]
  );

  useEffect(() => {
    if (galleryRef.current) {
      const ele = galleryRef.current as HTMLElement;
      const child = ele.children[0] as HTMLElement;
      const { height, width } = imageDimensions;

      if (scrollDir === "vertical") {
        const newHeight = rows * height + "px";
        child.style.height = newHeight;
      } else {
        // const newWidth = Math.round(totalImages / rows) * width + "px";
        child.style.width = "1200px";
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
  };
};

export default useSetup;
