import cx from "classnames";
import { FunctionComponent, ReactNode, useMemo } from "react";
import { ActionType } from "./controls.model";
import styles from "./controls.module.scss";

export type ButtonProps = {
  label: string;
  type: "control" | "default";
  actionType: ActionType;
  onAction: (type: ActionType) => void;
  endReached?: boolean;
  startReached?: boolean;
  children?: ReactNode;
};

const Button: FunctionComponent<ButtonProps> = ({
  onAction,
  endReached,
  startReached,
  label,
  type,
  children,
  actionType,
}) => {
  const controlButton = useMemo(
    () => cx(styles.control_button, styles.rounded),
    []
  );

  const controlClass = useMemo(
    () =>
      cx(
        type === "control" ? controlButton : "",
        styles.nav_button,
        endReached && actionType === "GO_DOWN" ? styles.button_disabled : "",
        startReached && actionType === "GO_UP" ? styles.button_disabled : ""
      ),
    [endReached, startReached]
  );

  return (
    <button
      aria-label={label}
      className={controlClass}
      onClick={() => onAction(actionType)}
    >
      {children}
    </button>
  );
};

export { Button };
