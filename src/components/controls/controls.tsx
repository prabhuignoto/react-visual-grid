import cx from "classnames";
import { FunctionComponent, useMemo } from "react";
import { ZoomLevel } from "../gallery/gallery.model";
import styles from "./controls.module.scss";

export type ActionType = "1X" | "2X" | "3X" | "FULL_SCREEN";

export type ControlsProps = {
  onAction: (type: ActionType) => void;
  activeZoom: ZoomLevel;
};

const Controls: FunctionComponent<ControlsProps> = ({
  onAction,
  activeZoom,
}) => {
  const controlButton = useMemo(
    () => cx(styles.control_button, styles.rounded),
    []
  );

  return (
    <ul className={styles.controls}>
      <li className={styles.control}>
        <button
          onClick={() => onAction("1X")}
          className={cx(
            controlButton,
            activeZoom === "1X" ? styles.active : ""
          )}
        >
          1X
        </button>
      </li>
      <li className={styles.control}>
        <button
          onClick={() => onAction("2X")}
          className={cx(
            controlButton,
            activeZoom === "2X" ? styles.active : ""
          )}
        >
          2X
        </button>
      </li>
      <li className={styles.control}>
        <button
          onClick={() => onAction("3X")}
          className={cx(
            controlButton,
            activeZoom === "3X" ? styles.active : ""
          )}
        >
          3X
        </button>
      </li>
      <li className={styles.control}>
        <button
          onClick={() => onAction("FULL_SCREEN")}
          className={styles.control_button}
        >
          FullScreen
        </button>
      </li>
    </ul>
  );
};

export { Controls };
