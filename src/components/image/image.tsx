import cx from "classnames";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AlertIcon } from "../icons";
import { ImageProps } from "./image.model";
import styles from "./image.module.scss";

const Image: FunctionComponent<ImageProps> = React.memo(
  ({ src, alt, width = 100, height = 100, onClick, index, id, selected }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [select, setSelect] = useState(selected);

    const onLoaded = () => setLoaded(true);
    const onError = () => setError(true);

    const imageClass = useMemo(
      () => cx(styles.image, loaded ? styles.visible : styles.hidden),
      [loaded]
    );

    const wrapperClass = useMemo(
      () =>
        select
          ? { backgroundColor: "#B4D5FE", height, width }
          : { height, width },
      [select]
    );

    const handleOpen = useCallback(
      (
        ev:
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>,
        src: string
      ) => {
        if (error) {
          return;
        }
        setSelect(!select);

        const { x, y } = (ev.target as HTMLElement).getBoundingClientRect();

        if (ev instanceof KeyboardEvent) {
          if (ev.key === "Enter") {
            onClick?.(src, id, { x, y });
          }
        } else {
          onClick?.(src, id, { x, y });
        }
      },
      [error, select]
    );

    return (
      <div
        className={styles.wrapper}
        onClick={(ev) => handleOpen(ev, src)}
        onKeyUp={(ev) => handleOpen(ev, src)}
        role="button"
        style={wrapperClass}
        tabIndex={0}
      >
        {error && (
          <span className={styles.icon}>
            <AlertIcon />
          </span>
        )}
        {!error && (
          <img
            alt={alt}
            className={imageClass}
            onError={onError}
            onLoad={onLoaded}
            src={src}
          />
        )}
      </div>
    );
  },
  (prev, next) => prev.index === next.index
);

Image.displayName = "Image";

export { Image };
