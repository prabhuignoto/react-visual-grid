import { FunctionComponent } from "react";
import { createPortal } from "react-dom";
import styles from "./viewer.module.scss";

export interface RootProps {
  url: string;
  isFullScreen: boolean;
  imagePosition?: {
    x: number;
    y: number;
  };
  // children: ReactElement | ReactElement[];
  node: HTMLElement | null;
}

const Viewer: FunctionComponent<RootProps> = ({ url, isFullScreen }) => {
  return (
    <div className={styles.container}>
      <div className={styles.viewer}>
        <img src={url} alt="" className={styles.image} />
      </div>
    </div>
  );
};

const ViewerContainer: FunctionComponent<RootProps> = (props) => {
  return (
    props.node &&
    createPortal(
      <>
        <Viewer {...props} />
      </>,
      props.node
    )
  );
};

export { Viewer, ViewerContainer };
