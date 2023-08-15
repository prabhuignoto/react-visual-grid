import { ReactNode } from "react";
import { ActionType } from "./controls.model";

/**
 * Represents the props for a button component.
 */

export type ButtonType = "control" | "default";

export type ButtonProps = {
  /** The label to display on the button. */
  label: string;
  /** The type of button. */
  type: ButtonType;
  /** The type of action to perform when the button is clicked. */
  actionType: ActionType;
  /** The function to call when the button is clicked. */
  onAction: (type: ActionType) => void;
  /** Whether the button has reached the end of its range. */
  endReached?: boolean;
  /** Whether the button has reached the start of its range. */
  startReached?: boolean;
  /** The child elements to render inside the button. */
  children?: ReactNode;
  /** Whether the button is currently active. */
  active?: boolean;
};
