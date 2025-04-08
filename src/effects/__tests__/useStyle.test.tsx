import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStyle } from "../useStyle";

describe("useStyle Hook", () => {
  const rootDimensions = { height: 600, width: 800 };
  const imageDimensions = { height: 100, width: 100 };
  const region = { regionBottom: 10, regionTop: 0 };
  const gap = 10;
  const columns = 4;
  const rows = 3;
  const mode = "auto";
  const gridLayout = "vertical";

  it("calculates correct grid settings for vertical layout in auto mode", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout,
        imageDimensions,
        isFullScreen: false,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.galleryStyle.gridTemplateColumns).toBe(
      `repeat(${columns}, 80px)`
    );
  });

  it("calculates correct grid settings for horizontal layout in auto mode", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout: "horizontal",
        imageDimensions,
        isFullScreen: false,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.galleryStyle.gridTemplateColumns).toBe(
      `repeat(${columns}, 90px)`
    );
    expect(result.current.galleryStyle.gridTemplateRows).toBe(
      `repeat(${rows}, 90px)`
    );
  });

  it("calculates correct gallery style for vertical layout", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout,
        imageDimensions,
        isFullScreen: false,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.galleryStyle.gridAutoRows).toBe("90px");
    expect(result.current.galleryStyle.top).toBe("20px");
  });

  it("calculates correct gallery style for horizontal layout", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout: "horizontal",
        imageDimensions,
        isFullScreen: false,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.galleryStyle.gridAutoColumns).toBe("90px");
    expect(result.current.galleryStyle.left).toBe("20px");
  });

  it("calculates correct wrapper style for full-screen mode", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout,
        imageDimensions,
        isFullScreen: true,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.wrapperStyle.position).toBe("fixed");
  });

  it("calculates correct wrapper style for resized mode", () => {
    const { result } = renderHook(() =>
      useStyle({
        columns,
        gap,
        gridLayout,
        imageDimensions,
        isFullScreen: false,
        isResized: true,
        mode,
        region,
        rootDimensions,
        rows,
      })
    );

    expect(result.current.wrapperStyle.position).toBe("absolute");
  });
});
