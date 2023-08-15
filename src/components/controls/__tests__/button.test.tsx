import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";
import { describe, it, expect, vi } from "vitest";
import { ButtonType } from "../button.model";
import { ActionType } from "../controls.model";
import styles from "../controls.module.scss";

describe("Button Component", () => {
  const defaultProps = {
    actionType: "GO_UP" as ActionType,
    label: "Test Label",
    onAction: vi.fn(),
    type: "control" as ButtonType,
  };

  it("renders the button with the correct label", () => {
    render(<Button {...defaultProps}>Click Me</Button>);
    const buttonElement = screen.getByLabelText("Test Label");
    expect(buttonElement).toBeInTheDocument();
  });

  it("handles the click event correctly", () => {
    render(<Button {...defaultProps}>Click Me</Button>);
    const buttonElement = screen.getByLabelText("Test Label");
    fireEvent.click(buttonElement);
    expect(defaultProps.onAction).toHaveBeenCalledWith("GO_UP");
  });

  it("renders the button with active class when active prop is true", () => {
    render(
      <Button {...defaultProps} active>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByLabelText("Test Label");
    expect(buttonElement).toHaveClass(styles.active);
  });

  it("renders the button as disabled when endReached is true and actionType is GO_DOWN", () => {
    render(
      <Button {...defaultProps} actionType="GO_DOWN" endReached>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByLabelText("Test Label");
    expect(buttonElement).toHaveClass(styles.button_disabled);
  });

  it("renders the button as disabled when startReached is true and actionType is GO_UP", () => {
    render(
      <Button {...defaultProps} actionType="GO_UP" startReached>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByLabelText("Test Label");
    expect(buttonElement).toHaveClass(styles.button_disabled);
  });

  it("does not render the button as disabled when endReached is true but actionType is not GO_DOWN", () => {
    render(
      <Button {...defaultProps} endReached>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByLabelText("Test Label");
    expect(buttonElement).not.toHaveClass(styles.button_disabled);
  });
});
