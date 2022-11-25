import { ReactNode } from "react";
import { ActionType } from "./controls.model";

export type ButtonProps = {
  label: string;
  type: "control" | "default";
  actionType: ActionType;
  onAction: (type: ActionType) => void;
  endReached?: boolean;
  startReached?: boolean;
  children?: ReactNode;
  active?: boolean;
};
