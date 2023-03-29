import React from "react";
import styles from "./ViewVideo.module.css";

import YouTube from "react-youtube";
import cx from "classnames";

const ViewVideo = ({ setOpen, video, open }) => {
  const imageIndex = 3;

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className={styles.fixed}>
      <div className={styles.imageWrapper}>
        <div className={cx(styles.dFlex, open ? styles.open : null)}>
          <YouTube
            className={styles.video}
            videoId={video.split("=")[1].split('"')[0].split("&")[0]}
            opts={opts}
          />
        </div>
      </div>
      <div className={styles.background} onClick={() => setOpen()}></div>
    </div>
  );
};

export default ViewVideo;
