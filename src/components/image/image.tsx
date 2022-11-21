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
  ({ src, alt, width = 100, height = 100, onClick, index, id }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const onLoaded = () => setLoaded(true);
    const onError = () => setError(true);

    const imageClass = useMemo(
      () => cx(styles.image, loaded ? styles.visible : styles.hidden),
      [loaded]
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

        const { x, y } = (ev.target as HTMLElement).getBoundingClientRect();

        if (ev instanceof KeyboardEvent) {
          if (ev.key === "Enter") {
            onClick?.(src, id, { x, y });
          }
        } else {
          onClick?.(src, id, { x, y });
        }
      },
      [error]
    );

    return (
      <div
        className={styles.wrapper}
        onClick={(ev) => handleOpen(ev, src)}
        onKeyUp={(ev) => handleOpen(ev, src)}
        role="button"
        style={{ height, width }}
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
