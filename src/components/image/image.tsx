import cx from "classnames";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ImageProps } from "./image.model";
import styles from "./image.module.scss";

const Image: FunctionComponent<ImageProps> = React.memo(
  ({ src, alt, width = 100, height = 100, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    const onLoaded = () => {
      setLoaded(true);
    };

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
        if (ev instanceof KeyboardEvent) {
          if (ev.key === "Enter") {
            onClick?.(src);
          }
        } else {
          onClick?.(src);
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
        {!loaded && <span>loading...</span>}
        <img src={src} alt={alt} className={imageClass} onLoad={onLoaded} />
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };
