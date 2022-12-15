import { ReactNode, useMemo, useRef } from "react";
import { useMasonry } from "../../effects/useMasonry";
import styles from "./masonry.module.scss";

export type MasonryProps = {
  children: ReactNode[];
  height?: number;
  width?: number;
  fillMode?: "HORIZONTAL" | "VERTICAL";
  gutter?: number;
};

const Masonry = ({
  children,
  height = 800,
  width = 1200,
  fillMode,
  gutter = 4,
}: MasonryProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useMasonry(ref, fillMode, gutter);

  const style = useMemo(
    () => ({ height: `${height}px`, width: `${width}px` }),
    [height, width]
  );

  return (
    <div className={styles.container} ref={ref} style={style}>
      {children}
    </div>
  );
};

export { Masonry };
