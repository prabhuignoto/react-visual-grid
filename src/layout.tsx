import { NavLink, Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>React Visual Grid</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.aside}>
          <NavLink to={"/vertical-masonry"}>
            <h2>Masonry Vertical</h2>
          </NavLink>
          <NavLink to={"/horizontal-masonry"}>
            <h2>Masonry Horizontal</h2>
          </NavLink>
          <NavLink to={"/horizontal"}>
            <h2>Grid Horizontal</h2>
          </NavLink>
          <NavLink to={"/vertical"}>
            <h2>Grid Vertical</h2>
          </NavLink>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
