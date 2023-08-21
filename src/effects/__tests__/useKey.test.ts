import { renderHook, act } from "@testing-library/react-hooks";
import useKey from "../useKey"; // Adjust the path to your hook
import { describe, expect, it, vi } from "vitest";

describe("useKey hook", () => {
  it("should handle Escape key press", () => {
    const escCB = vi.fn();
    const { result } = renderHook(() => useKey({ escCB }));
    const div = document.createElement("div");
    act(() => result.current.onRef(div));
    const event = new KeyboardEvent("keyup", { key: "Escape" });
    div.dispatchEvent(event);
    expect(escCB).toHaveBeenCalled();
  });

  it("should handle ArrowRight key press", () => {
    const rightCB = vi.fn();
    const { result } = renderHook(() => useKey({ rightCB }));
    const div = document.createElement("div");
    act(() => result.current.onRef(div));
    const event = new KeyboardEvent("keyup", { key: "ArrowRight" });
    div.dispatchEvent(event);
    expect(rightCB).toHaveBeenCalled();
  });

  it("should handle ArrowLeft key press", () => {
    const leftCB = vi.fn();
    const { result } = renderHook(() => useKey({ leftCB }));
    const div = document.createElement("div");
    act(() => result.current.onRef(div));
    const event = new KeyboardEvent("keyup", { key: "ArrowLeft" });
    div.dispatchEvent(event);
    expect(leftCB).toHaveBeenCalled();
  });

  it("should not call callbacks if not provided", () => {
    const { result } = renderHook(() => useKey({}));
    const div = document.createElement("div");
    act(() => result.current.onRef(div));
    const event = new KeyboardEvent("keyup", { key: "Escape" });
    div.dispatchEvent(event);
    // No error should occur, and no callbacks should be called
  });

  it("should clean up event listener on unmount", () => {
    const escCB = vi.fn();
    const { result, unmount } = renderHook(() => useKey({ escCB }));
    const div = document.createElement("div");
    act(() => result.current.onRef(div));
    unmount();
    const event = new KeyboardEvent("keyup", { key: "Escape" });
    div.dispatchEvent(event);
    expect(escCB).not.toHaveBeenCalled();
  });
});
