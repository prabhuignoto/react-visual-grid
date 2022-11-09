import { FunctionComponent } from "react";
import styles from "./controls.module.scss";

export type ActionType = "1X" | "2X" | "3X" | "FULL_SCREEN";

export type ControlsProps = {
  onAction: (type: ActionType) => void;
};

const Controls: FunctionComponent<ControlsProps> = ({ onAction }) => {
  return (
    <ul className={styles.controls}>
      <li>
        <button onClick={() => onAction("1X")}>1X</button>
      </li>
      <li>
        <button onClick={() => onAction("2X")}>2X</button>
      </li>
      <li>
        <button onClick={() => onAction("3X")}>3X</button>
      </li>
      <li>
        <button onClick={() => onAction("FULL_SCREEN")}>FullScreen</button>
      </li>
    </ul>
  );
};

export { Controls };
