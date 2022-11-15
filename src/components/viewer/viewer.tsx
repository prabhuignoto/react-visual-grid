import cx from "classnames";
import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../icons";
import { ViewerProps } from "./viewer.model";
import styles from "./viewer.module.scss";

const Viewer: FunctionComponent<ViewerProps> = ({
  url,
  dimensions: { height, width },
  rect: { x, y },
  onClose,
  top = 0,
  left = 0,
  onNext,
  onPrevious,
}) => {
  const style = useMemo(
    () => ({
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
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

  return (
    <div className={styles.container} style={style} role="dialog">
      <button onClick={onClose} className={styles.close_btn} aria-label="close">
        <CloseIcon />
      </button>
      <div className={styles.viewer}>
        <button className={styles.nav_button} onClick={onPrevious}>
          <ChevronLeftIcon />
        </button>
        <img src={url} alt="" className={imageClass} />
        <button className={styles.nav_button} onClick={onNext}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

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
