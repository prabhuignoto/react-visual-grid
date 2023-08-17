import { render, fireEvent } from "@testing-library/react";
import { Viewer } from "../viewer";
import { describe, expect, it, vi } from "vitest";
import styles from "../viewer.module.scss";

describe("Viewer Component", () => {
  const defaultProps = {
    activeImageIndex: 1,
    dimensions: { height: 300, width: 400 },
    onClose: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    totalImages: 3,
    url: "https://example.com/image.jpg",
  };

  it("renders correctly", () => {
    const { getByRole, getByAltText } = render(<Viewer {...defaultProps} />);
    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByAltText("")).toHaveAttribute("src", defaultProps.url);
  });

  it("handles close button click", () => {
    const { getByLabelText } = render(<Viewer {...defaultProps} />);
    fireEvent.click(getByLabelText("close"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("handles next button click", () => {
    const { getByLabelText } = render(<Viewer {...defaultProps} />);
    fireEvent.click(getByLabelText("next"));
    expect(defaultProps.onNext).toHaveBeenCalled();
  });

  it("handles previous button click", () => {
    const { getByLabelText } = render(<Viewer {...defaultProps} />);
    fireEvent.click(getByLabelText("previous"));
    expect(defaultProps.onPrevious).toHaveBeenCalled();
  });

  it("hides previous button if activeImageIndex is 0", () => {
    const { queryByLabelText } = render(
      <Viewer {...defaultProps} activeImageIndex={0} />
    );
    expect(queryByLabelText("previous")).toHaveClass(styles.hide);
  });

  it("hides next button if activeImageIndex is the last image", () => {
    const { queryByLabelText } = render(
      <Viewer
        {...defaultProps}
        activeImageIndex={defaultProps.totalImages - 1}
      />
    );
    expect(queryByLabelText("next")).toHaveClass(styles.hide);
  });

  it("applies custom dimensions", () => {
    const { getByRole } = render(<Viewer {...defaultProps} />);
    expect(getByRole("dialog")).toHaveStyle({
      height: `${defaultProps.dimensions.height}px`,
      width: `${defaultProps.dimensions.width}px`,
    });
  });
});
