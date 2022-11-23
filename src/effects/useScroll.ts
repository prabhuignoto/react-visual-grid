import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ImageDimensions } from "../components/grid/grid.model";
import { Region, ScrollPositions } from "./models";

export type Options = {
  ref: RefObject<HTMLElement>;
  imageDimensions: ImageDimensions;
  gridLayout?: "vertical" | "horizontal";
  resizeStarted?: boolean;
  resizeEnded?: boolean;
};

export default function useScroll({
  ref,
  imageDimensions,
  gridLayout,
  resizeStarted,
}: Options) {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [region, setRegion] = useState<Region>({
    regionBottom: 0,
    regionTop: 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  const intervalTrackerRef = useRef<number>();

  const [endReached, setEndReached] = useState(false);

  const [startReached, setStartReached] = useState(true);

  const [scrollPercent, setScrollPercent] = useState(0);

  const checkIfScrolled = useCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { scrollLeft, scrollTop } = target;
    if (intervalTrackerRef.current) {
      clearInterval(intervalTrackerRef.current);
    }

    intervalTrackerRef.current = window.setInterval(() => {
      if (target.scrollLeft === scrollLeft && target.scrollTop === scrollTop) {
        setIsScrolled(false);
        clearInterval(intervalTrackerRef.current);
      }
    }, 500);

    setIsScrolled(true);
  }, []);

  const scrollToTop = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    const ele = ref.current;

    if (ele) {
      const { scrollHeight, scrollWidth } = ele;
      const left = gridLayout === "horizontal" ? scrollWidth : 0;
      ele.scrollTo(left, scrollHeight);
    }
  }, [gridLayout]);

  const handleScroll = useDebouncedCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { height, width } = imageDimensions;
    const {
      scrollLeft,
      scrollTop,
      clientHeight,
      clientWidth,
      scrollHeight,
      scrollWidth,
    } = target;

    setScrollPositions({ scrollLeft, scrollTop });

    if (resizeStarted) {
      return;
    }

    if (setEndReached) {
      setEndReached(false);
    }

    if (gridLayout === "vertical") {
      setScrollPercent((scrollTop + clientHeight) / scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight) {
        setEndReached(true);
        setStartReached(false);
      }

      if (scrollTop === 0) {
        setStartReached(true);
      } else {
        setStartReached(false);
      }
    } else if (gridLayout === "horizontal") {
      setScrollPercent((scrollLeft + clientWidth) / scrollWidth);
      if (scrollLeft + clientWidth > clientWidth) {
        setEndReached(true);
        setStartReached(false);
      }

      if (scrollLeft === 0) {
        setStartReached(true);
      } else {
        setStartReached(false);
      }
    }

    const regionTop =
      gridLayout === "vertical" ? scrollTop / height : scrollLeft / width;
    const regionBottom =
      gridLayout === "vertical"
        ? (scrollTop + clientHeight) / height
        : (scrollLeft + clientWidth) / width;

    setRegion({
      regionBottom: Math.ceil(regionBottom),
      regionTop: Math.floor(regionTop),
    });
  }, 50);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
      ref.current.addEventListener("scroll", checkIfScrolled);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
        ref.current.removeEventListener("scroll", checkIfScrolled);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (resizeStarted) {
      ref.current?.scrollTo(0, 0);
    }
  }, [resizeStarted]);

  return {
    endReached,
    isScrolled,
    region,
    scrollPercent,
    scrollPositions,
    scrollToBottom,
    scrollToTop,
    setRegion,
    startReached,
  };
}
