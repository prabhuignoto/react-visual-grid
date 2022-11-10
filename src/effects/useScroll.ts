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
    upperBound: 0,
    lowerBound: 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  const intervalTrackerRef = useRef<number>();

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

  const handleScroll = useDebouncedCallback((ev: Event) => {
    const target = ev.target as HTMLDivElement;
    const { height, width } = imageDimensions;
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
  };
}
