import cx from "classnames";
import { FunctionComponent, useMemo } from "react";
import styles from "./screen.module.scss";

export type ScreenProps = {
  width?: number;
  height?: number;
  show?: boolean;
};

const Screen: FunctionComponent<ScreenProps> = ({
  show = false,
  width = 0,
  height = 0,
}) => {
  const screenClass = useMemo(
    () =>
      cx(
        styles.screen,
        show !== null ? (show ? styles.show : styles.hide) : ""
      ),
    [show]
  );

  const style = useMemo(() => {
    return {
      height: `${height}px`,
      width: `${width}px`,
    };
  }, [width, height]);

  // const message = useMemo(() => {
  //   return `${Math.round(width)} x ${Math.round(height)}`;
  // }, [width, height]);

  return (
    <div className={screenClass} style={style}>
      {/* <span className={styles.message}></span> */}
    </div>
  );
};

export { Screen };
