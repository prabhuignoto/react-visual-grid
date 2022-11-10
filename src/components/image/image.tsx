import cx from "classnames";
import React, { FunctionComponent, useMemo, useState } from "react";
import { ImageProps } from "./image.model";
import styles from "./image.module.scss";

const Image: FunctionComponent<ImageProps> = React.memo(
  ({ src, alt, width = 100, height = 100 }) => {
    const [loaded, setLoaded] = useState(false);

    const onLoaded = () => {
      setLoaded(true);
    };

    const imageClass = useMemo(
      () => cx(styles.image, loaded ? styles.visible : styles.hidden),
      [loaded]
    );

    return (
      <div className={styles.wrapper} style={{ width, height }}>
        {!loaded && <span>loading...</span>}
        <img src={src} alt={alt} className={imageClass} onLoad={onLoaded} />
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };
