import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { ProgressBarProps } from "./progress-bar.model";
import styles from "./progress-bar.module.scss";

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  percent,
  top = 0,
  containerWidth = 0,
  left = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      ref.current = node;
    }
  }, []);

  const style = useMemo(() => {
    const ele = ref.current;
    if (ele) {
      const width = containerWidth || ele.clientWidth;
      return {
        "--rc-images-width": `${Math.round(width * percent)}px`,
        left: `${left}px`,
        width: `${width}px`,
      } as CSSProperties;
    }
  }, [percent, ref.current, left]);

  return (
    <div className={styles.container} ref={onRef} style={style}>
      <span className={styles.progress_bar}></span>
    </div>
  );
};

export { ProgressBar };
