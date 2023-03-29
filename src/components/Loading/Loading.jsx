import React from "react";
import styles from "./Loading.module.css";

function Loading({ loaderStyle, circleCoreStyle, percentage }) {
  return (
    <div className={loaderStyle ? loaderStyle : styles.loaderContainer}>
      <div className={styles.spinnerBox}>
        <div className={styles.circleBorder}>
          <div
            className={circleCoreStyle ? circleCoreStyle : styles.circleCore}
          ></div>
        </div>
        {percentage !== undefined && (
          <div className={styles.percentage}>{percentage + "%"}</div>
        )}
      </div>
    </div>
  );
}

export default Loading;
