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

/**
 * Viewer
 * @property {string} url - The URL of the image.
 * @property {Object} dimensions - The dimensions of the viewer.
 * @property {number} dimensions.height - The height of the viewer.
 * @property {number} dimensions.width - The width of the viewer.
 * @property {Object} rect - The position of the viewer.
 * @property {number} rect.x - The x-coordinate of the viewer.
 * @property {number} rect.y - The y-coordinate of the viewer.
 * @property {() => void} onClose - Function to handle viewer close.
 * @property {number} top - The top position of the viewer.
 * @property {number} left - The left position of the viewer.
 * @property {() => void} onNext - Function to handle next image.
 * @property {() => void} onPrevious - Function to handle previous image.
 * @property {number} activeImageIndex - The index of the active image.
 * @property {number} totalImages - The total number of images.
 * @returns {JSX.Element} The Viewer component.
 */
const Viewer: FunctionComponent<ViewerProps> = React.memo(
  ({
    url,
    dimensions: { height, width },
    onClose,
    top = 0,
    left = 0,
    onNext,
    onPrevious,
    activeImageIndex,
    totalImages,
  }) => {
    // Memoize style object to prevent unnecessary re-renders
    const style = useMemo(
      () => ({
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
      }),
      [height, width, left, top]
    );

    // Reference to track the first render
    const isFirstRender = useRef(true);

    // State to manage image visibility
    const [showImage, setShowImage] = useState(false);

    // Effect to handle image visibility after initial render
    useEffect(() => {
      isFirstRender.current = false;
      setTimeout(() => {
        setShowImage(true);
      }, 100);
    }, []);

    // Memoize image class to prevent unnecessary re-renders
    const imageClass = useMemo(
      () =>
        cx(
          styles.image,
          !isFirstRender.current ? (showImage ? styles.show : styles.hide) : ""
        ),
      [showImage]
    );

    // Custom hook to handle keyboard navigation
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
            aria-label="previous"
            className={cx(
              styles.nav_button,
              activeImageIndex === 0 ? styles.hide : ""
            )}
            onClick={onPrevious}
          >
            <ChevronLeftIcon />
          </button>
          <img alt="" className={imageClass} src={url} />
          <button
            aria-label="next"
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
    // Custom comparison function to prevent unnecessary re-renders
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
