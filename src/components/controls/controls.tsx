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
  const { scrollDir, showProgressBar } = useContext(Context);
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
        [scrollDir === "vertical" ? "top" : "left"]:
          scrollDir === "horizontal"
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
      scrollDir === "horizontal" ? { width: containerWidth } : customStyle,
    [scrollDir, containerWidth, customStyle]
  );

  const controlsStyle = useMemo(
    () => (scrollDir === "horizontal" ? customStyle : {}),
    [scrollDir, customStyle]
  );

  return (
    <div
      className={controlWrapperClass}
      style={wrapperStyle}
      ref={scrollDir === "vertical" ? onRef : null}
    >
      <ul
        className={styles.controls}
        style={controlsStyle}
        ref={scrollDir === "horizontal" ? onRef : null}
      >
        <li className={styles.control}>
          <button
            className={cx(
              controlButton,
              styles.nav_button,
              startReached ? styles.button_disabled : ""
            )}
            aria-label="Go Up"
            onClick={() => onAction("GO_UP")}
          >
            <ChevronUpIcon />
          </button>
        </li>
        {["1X", "2X", "3X"].map((item, index) => (
          <li className={styles.control} key={index}>
            <button
              onClick={() => onAction(item as ActionType)}
              className={cx(
                controlButton,
                activeZoom === item ? styles.active : ""
              )}
              aria-label={item}
            >
              {item}
            </button>
          </li>
        ))}
        <li className={styles.control}>
          <button
            className={cx(
              controlButton,
              styles.nav_button,
              endReached ? styles.button_disabled : ""
            )}
            aria-label="Go Down"
            onClick={() => onAction("GO_DOWN")}
          >
            <ChevronDownIcon />
          </button>
        </li>
        <li className={cx(styles.control, styles.nav_button)}>
          <button
            onClick={() => onAction("FULL_SCREEN")}
            className={cx(controlButton)}
            aria-label={isFullScreen ? "Minimize" : "Maximize"}
          >
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </li>
      </ul>
      {showProgressBar ? (
        <ProgressBar
          percent={scrollPercent || 0}
          top={scrollPositions.scrollTop}
          left={scrollPositions.scrollLeft}
          containerWidth={rootWidth as number}
        />
      ) : null}
    </div>
  );
};

export { Controls };
