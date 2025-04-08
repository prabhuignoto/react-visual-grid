import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useTheme from "../useTheme";

// Define a test theme
const testTheme = {
  backgroundColor: "red",
  controlBgColor: "green",
  controlBtnColor: "yellow",
  controlsBackDropColor: "pink",
  primaryColor: "purple",
  thumbnailBgColor: "blue",
};

describe("useTheme Hook", () => {
  it("applies the correct styles to the target element", () => {
    // Create a target element
    const target = document.createElement("div");

    // Render the hook with the target element and test theme
    renderHook(() => useTheme(target, testTheme));

    // Check that the correct styles have been applied
    expect(target.style.getPropertyValue("--rcvg-bg-color")).toBe("red");
    expect(target.style.getPropertyValue("--rcvg-thumbnail-bg-color")).toBe(
      "blue"
    );
    expect(target.style.getPropertyValue("--rcvg-controls-bg-color")).toBe(
      "green"
    );
    expect(target.style.getPropertyValue("--rcvg-control-btn-color")).toBe(
      "yellow"
    );
    expect(
      target.style.getPropertyValue("--rcvg-controls-backdrop-color")
    ).toBe("pink");
    expect(target.style.getPropertyValue("--rcvg-primary-color")).toBe(
      "purple"
    );
  });

  it("does not apply styles if theme is not provided", () => {
    // Create a target element
    const target = document.createElement("div");

    // Render the hook with the target element but without a theme
    renderHook(() => useTheme(target));

    // Check that no styles have been applied
    expect(target.style.cssText).toBe("");
  });
});
