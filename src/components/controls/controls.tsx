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
import { Button } from "./button";
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
        className={cx(styles.controls, hide ? styles.hide : "")}
        ref={gridLayout === "horizontal" ? onRef : null}
        style={controlsStyle}
      >
        <li className={styles.control}>
          <Button
            actionType="GO_UP"
            label="Go Up"
            onAction={() => onAction("GO_UP")}
            startReached={startReached}
            type="control"
          >
            <ChevronUpIcon />
          </Button>
        </li>
        {["1X", "2X", "3X"].map((item, index) => (
          <li className={styles.control} key={index}>
            <Button
              actionType={item as ActionType}
              label={item}
              onAction={onAction}
              type="control"
            >
              {item}
            </Button>
          </li>
        ))}
        <li className={styles.control}>
          <Button
            actionType="GO_DOWN"
            endReached={endReached}
            label={"Go Down"}
            onAction={onAction}
            type="control"
          >
            <ChevronDownIcon />
          </Button>
        </li>
        <li className={cx(styles.control, styles.nav_button)}>
          <Button
            actionType="FULL_SCREEN"
            label={isFullScreen ? "Minimize" : "Maximize"}
            onAction={onAction}
            type="control"
          >
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
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
