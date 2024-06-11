/**
 * Button Component
 *
 * The Button component is a reusable button element used within the Controls component.
 * It can be styled and behave differently based on the provided props.
 *
 * @param {ButtonPropsType} props - The properties for the Button component.
 * @param {Function} props.onAction - Callback function for button actions.
 * @param {boolean} props.endReached - Indicator for reaching the end (disables the button if actionType is "GO_DOWN").
 * @param {boolean} props.startReached - Indicator for reaching the start (disables the button if actionType is "GO_UP").
 * @param {string} props.label - Accessible label for the button.
 * @param {string} props.type - Type of the button (e.g., "control").
 * @param {React.ReactNode} props.children - Inner content of the button.
 * @param {string} props.actionType - Action type associated with the button.
 * @param {boolean} props.active - Active state for styling purposes.
 *
 * @returns {JSX.Element} The rendered Button component.
 */

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
    [],
  );

  const controlClass = useMemo(
    () =>
      cx(
        type === "control" ? controlButton : "",
        styles.nav_button,
        endReached && actionType === "GO_DOWN" ? styles.button_disabled : "",
        startReached && actionType === "GO_UP" ? styles.button_disabled : "",
        active ? styles.active : "",
      ),
    [endReached, startReached, active],
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
