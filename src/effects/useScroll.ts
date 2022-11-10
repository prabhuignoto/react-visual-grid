import { RefObject, useEffect, useState } from "react";
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
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>();
  const [region, setRegion] = useState<Region>({
    upperBound: 0,
    lowerBound: 0,
  });

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
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return {
    scrollPositions,
    region,
    setRegion,
  };
}
