import { render, fireEvent } from "@testing-library/react";
import { Image } from "../image";
import { expect, it, describe, vi, beforeEach } from "vitest";
import styles from "../image.module.scss";

describe("Image Component", () => {
  const defaultProps = {
    alt: "Test Image",
    height: 100,
    id: "image-1",
    index: 0,
    onClick: vi.fn(),
    src: "https://via.placeholder.com/100",
    width: 100,
  };

  beforeEach(() => {
    defaultProps.onClick.mockClear();
  });

  it("renders correctly with default props", () => {
    const { getByRole } = render(<Image {...defaultProps} />);
    const img = getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultProps.src);
    expect(img).toHaveAttribute("alt", defaultProps.alt);
  });

  it("applies custom width and height", () => {
    const { container } = render(<Image {...defaultProps} />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveStyle({
      height: `${defaultProps.height}px`,
      width: `${defaultProps.width}px`,
    });
  });

  it("handles image loading", () => {
    const { getByRole } = render(<Image {...defaultProps} />);
    const img = getByRole("img");
    fireEvent.load(img);
    expect(img).toHaveClass(styles.visible);
  });

  it("handles image error", () => {
    const { getByRole } = render(<Image {...defaultProps} />);
    const img = getByRole("img");
    fireEvent.error(img);
    const alertIcon = getByRole("alert");
    expect(alertIcon).toBeInTheDocument();
  });

  it("handles image click", () => {
    const { getByRole } = render(<Image {...defaultProps} />);
    const wrapperDiv = getByRole("button");
    fireEvent.click(wrapperDiv);
    expect(defaultProps.onClick).toHaveBeenCalledWith(
      defaultProps.src,
      defaultProps.id,
      expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
    );
  });

  it("handles image keyup with Enter key", () => {
    const { getByRole } = render(<Image {...defaultProps} />);
    const wrapperDiv = getByRole("button");
    fireEvent.keyUp(wrapperDiv, { key: "Enter" });
    expect(defaultProps.onClick).toHaveBeenCalledWith(
      defaultProps.src,
      defaultProps.id,
      expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
    );
  });
});
