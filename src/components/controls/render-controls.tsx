import styles from "./controls.module.scss";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SunIcon,
  MoonIcon,
  FullScreenIcon,
  DefaultScreen,
} from "../icons";
import { ActionType } from "./controls.model";
import { Button } from "./button";
import cx from "classnames";

type RenderControlsProps = {
  activeZoom: string; // You can further define a specific type if there are limited values for activeZoom
  onAction: (action: ActionType) => void;
  startReached?: boolean;
  endReached?: boolean;
  isFullScreen?: boolean;
  isDark?: boolean;
};

const renderControls = ({
  activeZoom,
  onAction,
  startReached,
  endReached,
  isFullScreen,
  isDark,
}: RenderControlsProps) => {
  return (
    <>
      <li className={styles.control}>
        <Button
          actionType="GO_UP"
          label="Go Up"
          onAction={() => onAction("GO_UP")}
          startReached={startReached}
          type="control"
        >
          <ChevronUpIcon />
        </Button>
      </li>
      {["1X", "2X", "3X"].map((item, index) => (
        <li className={styles.control} key={index}>
          <Button
            actionType={item as ActionType}
            active={activeZoom === item}
            label={item}
            onAction={onAction}
            type="control"
          >
            {item}
          </Button>
        </li>
      ))}
      <li className={styles.control}>
        <Button
          actionType="GO_DOWN"
          endReached={endReached}
          label={"Go Down"}
          onAction={onAction}
          type="control"
        >
          <ChevronDownIcon />
        </Button>
      </li>
      <li className={cx(styles.control, styles.nav_button)}>
        <Button
          actionType="FULL_SCREEN"
          label={isFullScreen ? "Minimize" : "Maximize"}
          onAction={onAction}
          type="control"
        >
          {isFullScreen ? <DefaultScreen /> : <FullScreenIcon />}
        </Button>
      </li>
      <li className={cx(styles.control, styles.nav_button)}>
        <Button
          actionType="TOGGLE_THEME"
          label={isDark ? "white" : "dark"}
          onAction={onAction}
          type="control"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </Button>
      </li>
    </>
  );
};

export { renderControls };
