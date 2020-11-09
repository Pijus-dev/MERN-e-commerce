import React from "react";

import styles from "./customButton.module.scss";

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <button className={styles.customButton} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
