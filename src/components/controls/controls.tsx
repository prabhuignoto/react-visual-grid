import cx from "classnames";
import {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Context } from "../context";
import { MaximizeIcon } from "../icons";
import { ProgressBar } from "../progress-bar/progress-bar";
import { ControlsProps } from "./controls.model";
import styles from "./controls.module.scss";
import { useCustomStyle } from "./useCustomStyle";
import { renderControls } from "./render-controls";

const Controls = forwardRef<HTMLElement, ControlsProps>(
  (
    {
      onAction,
      activeZoom,
      isScrolled,
      hide,
      scrollPositions,
      rootHeight = 0,
      rootWidth = 0,
      containerWidth,
      containerHeight,
      isFullScreen,
      scrollPercent,
      endReached,
      startReached,
      isDark,
    }: ControlsProps,
    ref
  ) => {
    const { gridLayout, showProgressBar, enableResize } = useContext(Context);

    const controlWrapperRef = useRef<HTMLDivElement | HTMLUListElement | null>(
      null
    );

    const customStyle = useCustomStyle({
      controlWrapperRef,
      gridLayout,
      rootHeight,
      rootWidth,
      scrollPositions,
    });

    const controlWrapperClass = useMemo(
      () => cx(styles.controls_wrapper, hide ? styles.hide : ""),
      [hide]
    );

    const onRef = useCallback(
      (node: HTMLDivElement | HTMLUListElement | null) => {
        if (node) {
          controlWrapperRef.current = node;
        }
      },
      []
    );

    const resizeRef = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle(ref, () => resizeRef.current as HTMLElement);
    const wrapperStyle = useMemo(
      () =>
        gridLayout === "horizontal" ? { width: containerWidth } : customStyle,
      [gridLayout, containerWidth, customStyle]
    );

    const controlsStyle = useMemo(
      () => (gridLayout === "horizontal" ? customStyle : {}),
      [gridLayout, customStyle]
    );

    return (
      <div
        className={controlWrapperClass}
        ref={gridLayout === "vertical" ? onRef : null}
        style={wrapperStyle}
      >
        <ul
          className={cx(styles.controls, hide ? styles.hide : "")}
          ref={gridLayout === "horizontal" ? onRef : null}
          style={controlsStyle}
        >
          {renderControls({
            activeZoom,
            endReached,
            isDark,
            isFullScreen,
            onAction,
            startReached,
          })}
        </ul>
        {showProgressBar ? (
          <ProgressBar
            containerWidth={rootWidth as number}
            left={scrollPositions.scrollLeft}
            percent={scrollPercent || 0}
            top={scrollPositions.scrollTop}
          />
        ) : null}

        {enableResize && !isFullScreen ? (
          <span
            aria-label="resize"
            className={styles.resize_btn}
            ref={resizeRef}
            role="button"
          >
            <MaximizeIcon />
          </span>
        ) : null}
      </div>
    );
  }
);

Controls.displayName = "Controls";

export { Controls };
