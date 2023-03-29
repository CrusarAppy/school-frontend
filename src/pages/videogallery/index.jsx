import React, { useState, useRef, useEffect } from "react";

import { Container } from "react-bootstrap";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import "./style.css";
import ViewVideo from "./ViewVideo/ViewVideo";
import Hero from "../../components/Hero/Hero";

import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import { deleteVideo, getVideos } from "../../utils/api/videoGallery";
import { getDateFromTimestamp } from "../../utils/dateTime/date";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { useTranslation } from "react-i18next";
import cx from "classnames";

function VideoGallery() {
  const [openViewer, setOpenViewer] = React.useState();
  const [videolink, setVideolink] = React.useState("");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { i18n } = useTranslation();

  const youtubeimage = (videolink) => {
    const videoid = videolink.split("=")[1].split('"')[0];
    return `http://img.youtube.com/vi/${videoid}/0.jpg`;
  };

  const fetchvideos = () => {
    setLoading(true);
    getVideos(page, i18n.language === "en" ? "english" : "nepali")
      .then((res) => {
        if (res.status === "success") {
          console.log(res.data.videos);
          setVideos(res.data.videos);
          if (page === 1) {
            currentEntries.current = res.data.videos.length;
            lastPage.current = res.data.last_page;
          }
        } else {
          //toast
        }
        setLoading(false);
      })
      .catch((err) => {
        // axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchvideos();
    }
    return () => {
      mounted = false;
    };
  }, [page, refresh]);

  const youtubeImage = (videolink) => {
    const videoid = videolink.split("=")[1].split('"')[0].split("&")[0];
    return `http://img.youtube.com/vi/${videoid}/0.jpg`;
  };

  return (
    <>
      <Hero />
      <section className="photo-gallery-container ptb-120">
        <div className="photo-grid container">
          {videos.map((dat, i) => {
            return (
              <div className={cx(styles.card)} key={i} id="video">
                <img
                  src={youtubeImage(dat.video)}
                  className={styles.absolute}
                ></img>
                <div className="main-banner-content">
                  <div className="button-box">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenViewer((data) => !data);
                        setVideolink(dat.video);
                      }}
                      to="#"
                      className="video-btn popup-youtube"
                    >
                      <i className="icofont-ui-play"></i>
                    </div>
                  </div>
                </div>
                <div className={styles.videotitle}>{dat.title} </div>
              </div>
            );
          })}
          {openViewer && (
            <ViewVideo
              open={openViewer}
              setOpen={() => setOpenViewer((dat) => !dat)}
              video={videolink}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default VideoGallery;
