import cx from "classnames";
import { ReactNode, useMemo, useRef } from "react";
import { useMasonry } from "../../effects/useMasonry";
import styles from "./masonry.module.scss";

export type MasonryProps = {
  children: ReactNode[];
  height?: number;
  width?: number;
  fillMode?: "HORIZONTAL" | "VERTICAL";
  gutter?: number;
  enableAnimation?: boolean;
  animationDelay?: number;
};

const Masonry = ({
  children,
  height = 800,
  width = 1200,
  fillMode,
  gutter = 4,
  enableAnimation = true,
}: MasonryProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useMasonry({ enableAnimation, fillMode, gutter, target: ref });

  const style = useMemo(
    () => ({ height: `${height}px`, width: `${width}px` }),
    [height, width]
  );

  const containerClass = cx(
    styles.container,
    !gutter ? styles.no_gutter : "",
    []
  );

  return (
    <div className={containerClass} ref={ref} style={style}>
      {children}
    </div>
  );
};

export { Masonry };
