import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ImageDimensions } from "../components/gallery/gallery.model";
import { Region, ScrollPositions } from "./models";

export type Options = {
  ref: RefObject<HTMLElement>;
  imageDimensions: ImageDimensions;
  scrollDir?: "vertical" | "horizontal";
};

export default function useScroll({
  ref,
  imageDimensions,
  scrollDir,
}: Options) {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [region, setRegion] = useState<Region>({
    regionTop: 0,
    regionBottom: 0,
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
      const left = scrollDir === "horizontal" ? scrollWidth : 0;
      ele.scrollTo(left, scrollHeight);
    }
  }, [scrollDir]);

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

    if (setEndReached) {
      setEndReached(false);
    }

    if (scrollDir === "vertical") {
      setScrollPercent((scrollTop + clientHeight) / scrollHeight);
      if (scrollTop + clientHeight >= scrollHeight) {
        setEndReached(true);
        setStartReached(false);
      }

      if (scrollTop === 0) {
        setStartReached(true);
      }
    } else if (scrollDir === "horizontal") {
      setScrollPercent((scrollLeft + clientWidth) / scrollWidth);
      if (scrollLeft + clientWidth > clientWidth) {
        setEndReached(true);
        setStartReached(false);
      }

      if (scrollLeft === 0) {
        setStartReached(true);
      }
    }

    const regionTop =
      scrollDir === "vertical" ? scrollTop / height : scrollLeft / width;
    const regionBottom =
      scrollDir === "vertical"
        ? (scrollTop + clientHeight) / height
        : (scrollLeft + clientWidth) / width;

    setRegion({
      regionTop: Math.floor(regionTop),
      regionBottom: Math.ceil(regionBottom),
    });
  }, 30);

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

  return {
    scrollPositions,
    region,
    setRegion,
    isScrolled,
    startReached,
    endReached,
    scrollPercent,
    scrollToTop,
    scrollToBottom,
  };
}
