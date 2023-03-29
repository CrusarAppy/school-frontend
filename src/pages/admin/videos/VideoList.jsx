import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import EditCard from "../../../components/Admin/Card/EditCard";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import { deleteVideo, getVideos } from "../../../utils/api/videoGallery";
import { getDateFromTimestamp } from "../../../utils/dateTime/date";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./VideoList.module.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/videos/${id}`);
  };

  const handleDelete = (id) => {
    dialogRef.current = {
      title: "Are you sure?",
      body: "This will delete the video.",
      onSave: () => {
        setLoading(true);
        deleteVideo(id)
          .then((res) => {
            notifySuccess("Deleted successfully.");
            setDialogVisible(false);
            setRefresh(!refresh);
          })
          .catch((err) => {
            axiosErrorHandler(err, notifyError);
            setLoading(false);
          });
      },
    };
    setDialogVisible(true);
  };
  const fetchvideos = () => {
    setLoading(true);
    getVideos(page, "english")
      .then((res) => {
        if (res.status === "success") {
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
        axiosErrorHandler(err, notifyError);
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
  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <ConfirmDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        title={dialogRef.current.title}
        body={dialogRef.current.body}
        onOk={dialogRef.current.onSave}
      />
      <div className={styles.cardContainer}>
        {videos.map((element) => {
          return (
            <EditCard
              key={element.id}
              title={element.title}
              date={getDateFromTimestamp(element.created_at)}
              photo={youtubeImage(element.video)}
              handleEdit={() => {
                handleEdit(element.id);
              }}
              handleDelete={() => {
                handleDelete(element.id);
              }}
              handleView={() => {
                window.open(element.video);
              }}
            />
          );
        })}
      </div>
      {videos.length > 0 ? (
        <div>
          <Pagination
            page={page}
            setPage={setPage}
            lastPage={lastPage.current}
          />
        </div>
      ) : (
        <>No data to show</>
      )}
    </div>
  );
};

export default VideoList;
