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
  ({ src, alt, width = 100, height = 100, onClick, index }) => {
    console.log(width);
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
        const { x, y } = (ev.target as HTMLElement).getBoundingClientRect();

        if (ev instanceof KeyboardEvent) {
          if (ev.key === "Enter") {
            onClick?.(src, index, { x, y });
          }
        } else {
          onClick?.(src, index, { x, y });
        }
      },
      []
    );

    return (
      <div
        className={styles.wrapper}
        style={{ width, height }}
        role="button"
        onClick={(ev) => handleOpen(ev, src)}
        onKeyUp={(ev) => handleOpen(ev, src)}
        tabIndex={0}
      >
        {error && (
          <span className={styles.icon}>
            <AlertIcon />
          </span>
        )}
        {!error && (
          <img
            src={src}
            alt={alt}
            className={imageClass}
            onLoad={onLoaded}
            onError={onError}
          />
        )}
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };
