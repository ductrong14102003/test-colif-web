import React from "react";

import styles from "./index.module.css";

const WrapperContent = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default WrapperContent;
