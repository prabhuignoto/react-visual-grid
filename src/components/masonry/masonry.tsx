import { ReactNode, useMemo, useRef } from "react";
import { useMasonry } from "../../effects/useMasonry";
import styles from "./masonry.module.scss";

export type MasonryProps = {
  children: ReactNode[];
  height?: number;
  width?: number;
};

const Masonry = ({ children, height = 500, width = 700 }: MasonryProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useMasonry(ref.current);

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
