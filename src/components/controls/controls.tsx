import cx from "classnames";
import {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { Context } from "../context";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "../icons";
import { ProgressBar } from "../progress-bar/progress-bar";
import { ActionType, ControlsProps } from "./controls.model";
import styles from "./controls.module.scss";

const Controls: FunctionComponent<ControlsProps> = ({
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
}) => {
  const { gridLayout, showProgressBar } = useContext(Context);
  const controlButton = useMemo(
    () => cx(styles.control_button, styles.rounded),
    []
  );

  const controlWrapperRef = useRef<HTMLDivElement | HTMLUListElement | null>(
    null
  );

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

  const customStyle = useMemo<CSSProperties>(() => {
    if (controlWrapperRef.current) {
      const { scrollLeft, scrollTop } = scrollPositions;
      const ele = controlWrapperRef.current as HTMLElement;

      const { clientHeight: controlHeight, clientWidth: controlWidth } = ele;

      let style = {
        [gridLayout === "vertical" ? "top" : "left"]:
          gridLayout === "horizontal"
            ? `${(scrollLeft + rootWidth) / 2 - controlWidth / 2}px`
            : `${scrollTop + rootHeight - controlHeight}px`,
      };

      if (scrollLeft) {
        style = {
          left: `${scrollLeft + rootWidth / 2 - controlWidth / 2}px`,
        };
      } else if (scrollTop) {
        style = {
          top: `${scrollTop + rootHeight - controlHeight}px`,
        };
      }
      return style;
    } else {
      return {};
    }
  }, [
    scrollPositions?.scrollTop,
    scrollPositions?.scrollLeft,
    rootHeight,
    rootWidth,
    controlWrapperRef.current,
  ]);

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
        className={styles.controls}
        ref={gridLayout === "horizontal" ? onRef : null}
        style={controlsStyle}
      >
        <li className={styles.control}>
          <button
            aria-label="Go Up"
            className={cx(
              controlButton,
              styles.nav_button,
              startReached ? styles.button_disabled : ""
            )}
            onClick={() => onAction("GO_UP")}
          >
            <ChevronUpIcon />
          </button>
        </li>
        {["1X", "2X", "3X"].map((item, index) => (
          <li className={styles.control} key={index}>
            <button
              aria-label={item}
              className={cx(
                controlButton,
                activeZoom === item ? styles.active : ""
              )}
              onClick={() => onAction(item as ActionType)}
            >
              {item}
            </button>
          </li>
        ))}
        <li className={styles.control}>
          <button
            aria-label="Go Down"
            className={cx(
              controlButton,
              styles.nav_button,
              endReached ? styles.button_disabled : ""
            )}
            onClick={() => onAction("GO_DOWN")}
          >
            <ChevronDownIcon />
          </button>
        </li>
        <li className={cx(styles.control, styles.nav_button)}>
          <button
            aria-label={isFullScreen ? "Minimize" : "Maximize"}
            className={cx(controlButton)}
            onClick={() => onAction("FULL_SCREEN")}
          >
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </li>
      </ul>
      {showProgressBar ? (
        <ProgressBar
          containerWidth={rootWidth as number}
          left={scrollPositions.scrollLeft}
          percent={scrollPercent || 0}
          top={scrollPositions.scrollTop}
        />
      ) : null}
    </div>
  );
};

export { Controls };
