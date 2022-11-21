import cx from "classnames";
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useKey from "../../effects/useKey";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../icons";
import { ViewerProps } from "./viewer.model";
import styles from "./viewer.module.scss";

const Viewer: FunctionComponent<ViewerProps> = React.memo(
  ({
    url,
    dimensions: { height, width },
    rect: { x, y },
    onClose,
    top = 0,
    left = 0,
    onNext,
    onPrevious,
    activeImageIndex,
    totalImages,
  }) => {
    const style = useMemo(
      () => ({
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
      }),
      [height, width, x, y]
    );

    const isFirstRender = useRef(true);

    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
      isFirstRender.current = false;
      setTimeout(() => {
        setShowImage(true);
      }, 100);
    }, []);

    const imageClass = useMemo(
      () =>
        cx(
          styles.image,
          !isFirstRender.current ? (showImage ? styles.show : styles.hide) : ""
        ),
      [showImage]
    );

    const { onRef } = useKey({
      escCB: onClose,
      leftCB: onPrevious,
      rightCB: onNext,
    });

    return (
      <div
        className={styles.container}
        ref={onRef}
        role="dialog"
        style={style}
        tabIndex={0}
      >
        <button
          aria-label="close"
          className={styles.close_btn}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className={styles.viewer}>
          <button
            className={cx(
              styles.nav_button,
              activeImageIndex === 1 ? styles.hide : ""
            )}
            onClick={onPrevious}
          >
            <ChevronLeftIcon />
          </button>
          <img alt="" className={imageClass} src={url} />
          <button
            className={cx(
              styles.nav_button,
              activeImageIndex === totalImages - 1 ? styles.hide : ""
            )}
            onClick={onNext}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.url === next.url &&
      prev.dimensions.height === next.dimensions.height &&
      prev.dimensions.width === next.dimensions.width &&
      prev.top === next.top &&
      prev.left === next.left
    );
  }
);

Viewer.displayName = "Viewer";

const ViewerContainer: FunctionComponent<ViewerProps> = (props) => {
  return props.show && props.node
    ? createPortal(
        <>
          <Viewer {...props} onClose={props.onClose} />
        </>,
        props.node
      )
    : null;
};

export { Viewer, ViewerContainer };
