/**
 * Image
 * @property {string} src - The source URL of the image.
 * @property {string} alt - The alternative text for the image.
 * @property {number} width - The width of the image (default 100).
 * @property {number} height - The height of the image (default 100).
 * @property {(src: string, id: string, position: { x: number, y: number }) => void} onClick - Function to handle image click.
 * @property {number} index - The index of the image.
 * @property {string} id - The ID of the image.
 * @returns {JSX.Element} The Image component.
 */
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
    // State to manage image loading and error status
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Callbacks to handle image loading and error events
    const onLoaded = () => setLoaded(true);
    const onError = () => setError(true);

    // Memoized class for image visibility
    const imageClass = useMemo(
      () => cx(styles.image, loaded ? styles.visible : styles.hidden),
      [loaded]
    );

    // Callback to handle image click and keyboard events
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

        // Handling keyboard "Enter" key event
        if (ev instanceof KeyboardEvent && ev.key !== "Enter") {
          return;
        }

        onClick?.(src, id, { x, y });
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
        {error ? (
          <span className={styles.icon} role="alert">
            <AlertIcon />
          </span>
        ) : (
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
  // Custom comparison function to prevent unnecessary re-renders
  (prev, next) => prev.index === next.index
);

Image.displayName = "Image";

export { Image };
