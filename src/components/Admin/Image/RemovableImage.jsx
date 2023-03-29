import React, { memo, useState } from "react";
import styles from "./RemovableImage.module.css";

const RemovableImage = ({ imgSrc, onRemove, index }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={styles.closeIconContainer}
        onClick={() => {
          onRemove(index);
        }}
      >
        <div className={styles.closeIcon}>X</div>
      </div>
      <img
        src={imgSrc}
        className={loaded ? styles.loadedImage : styles.notLoadedImage}
        onLoad={() => {
          setLoaded(true);
        }}
        alt=""
      />
    </div>
  );
};

const areEqual = (a, b) => {
  return a.imgSrc === b.imgSrc;
};

export default memo(RemovableImage, areEqual);
