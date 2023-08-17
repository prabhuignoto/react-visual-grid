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

  const percentToUse = useMemo(() => {
    return Math.min(Math.max(0, percent), 1.0);
  }, [percent]);

  const style = useMemo(() => {
    const ele = ref.current;
    if (ele) {
      const width = containerWidth || ele.clientWidth;
      return {
        "--rc-images-width": `${Math.round(width * percentToUse)}px`,
        left: `${left}px`,
        width: `${width}px`,
      } as CSSProperties;
    }
  }, [percentToUse, ref.current, left]);

  return (
    <div className={styles.container} ref={onRef} style={style}>
      <progress
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percentToUse * 100}
        className={styles.progress_bar}
        max="100"
        style={{ border: 0 }}
        value={percentToUse * 100}
      ></progress>
    </div>
  );
};

export { ProgressBar };
