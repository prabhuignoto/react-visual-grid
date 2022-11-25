import cx from "classnames";
import { FunctionComponent, useMemo } from "react";
import { ButtonProps } from "./button.model";
import styles from "./controls.module.scss";

const Button: FunctionComponent<ButtonProps> = ({
  onAction,
  endReached,
  startReached,
  label,
  type,
  children,
  actionType,
  active,
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
        startReached && actionType === "GO_UP" ? styles.button_disabled : "",
        active ? styles.active : ""
      ),
    [endReached, startReached, active]
  );

  return (
    <button
      aria-label={label}
      className={controlClass}
      onClick={() => onAction(actionType)}
      title={label}
    >
      {children}
    </button>
  );
};

export { Button };
