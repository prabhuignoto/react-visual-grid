/**
 * Controls Component
 *
 * The Controls component is responsible for rendering navigation controls such as zoom buttons,
 * scroll indicators, and theme toggles. It also handles positioning based on the scroll position
 * and grid layout.
 *
 * @param {ControlsProps} props - The properties for the Controls component.
 * @param {Function} props.onAction - Callback function for control actions.
 * @param {string} props.activeZoom - Active zoom level.
 * @param {boolean} props.isScrolled - Scrolling state.
 * @param {Object} props.scrollPositions - Scroll positions.
 * @param {number} props.rootHeight - Root container height.
 * @param {number} props.rootWidth - Root container width.
 * @param {number} props.containerWidth - Container width.
 * @param {number} props.containerHeight - Container height.
 * @param {boolean} props.isFullScreen - Fullscreen state.
 * @param {number} props.scrollPercent - Scroll percentage.
 * @param {boolean} props.endReached - Indicator for reaching the end.
 * @param {boolean} props.startReached - Indicator for reaching the start.
 * @param {boolean} props.isDark - Dark mode state.
 *
 * @returns {JSX.Element} The rendered Controls component.
 */

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
