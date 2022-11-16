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
      console.log(ele.clientWidth);
      return {
        "--rc-images-width": `${Math.round(ele?.clientWidth * percent)}px`,
        // top: `${top}px`,
      } as CSSProperties;
    }
  }, [percent, ref.current]);

  return (
    <div ref={onRef} style={style} className={styles.container}>
      <span className={styles.progress_bar}></span>
    </div>
  );
};

export { ProgressBar };
