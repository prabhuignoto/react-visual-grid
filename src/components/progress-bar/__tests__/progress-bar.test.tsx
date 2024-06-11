import { render } from "@testing-library/react";
import { ProgressBar } from "../progress-bar";
import { describe, expect, it } from "vitest";

describe("ProgressBar Component", () => {
  const defaultProps = {
    containerWidth: 200,
    left: 5,
    percent: 0.5,
    top: 10,
  };

  it("renders correctly with default props", () => {
    const { getByRole } = render(<ProgressBar {...defaultProps} />);
    const progressBar = getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    expect(progressBar).toHaveAttribute("value", "50");
  });

  //   it("applies custom width and left position", async () => {
  //     const { container } = render(<ProgressBar {...defaultProps} />);
  //     const containerDiv = container.firstChild as HTMLElement;

  //     console.log(containerDiv.style);

  //     await waitFor(() => {
  //       expect(containerDiv).toHaveStyle({
  //         left: `${defaultProps.left}px`,
  //         width: `${defaultProps.containerWidth}px`,
  //       });
  //     });
  //   });

  it("renders correctly with 0 percent", () => {
    const { getByRole } = render(<ProgressBar {...defaultProps} percent={0} />);
    const progressBar = getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
    expect(progressBar).toHaveAttribute("value", "0");
  });

  it("renders correctly with 100 percent", () => {
    const { getByRole } = render(<ProgressBar {...defaultProps} percent={1} />);
    const progressBar = getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
    expect(progressBar).toHaveAttribute("value", "100");
  });

  it("does not render with negative percent", () => {
    const { getByRole } = render(
      <ProgressBar {...defaultProps} percent={-0.1} />,
    );
    const progressBar = getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
    expect(progressBar).toHaveAttribute("value", "0");
  });

  it("does not render more than 100 percent", () => {
    const { getByRole } = render(
      <ProgressBar {...defaultProps} percent={1.1} />,
    );
    const progressBar = getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
    expect(progressBar).toHaveAttribute("value", "100");
  });
});
