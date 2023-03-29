import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditVideo.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import { getVideoById, updateVideo } from "../../../utils/api/videoGallery";
import VideoForm from "../../../components/Admin/Video/VideoForm";

const EditVideo = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
    },
    english: {
      title: "",
    },
    video: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const assetUrl = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
    };
    setLoading(true);

    updateVideo(id, uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/videos/");
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  const fetchVideoData = () => {
    setLoading(true);
    getVideoById(id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        setData(res.data.video);
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
      fetchVideoData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <VideoForm data={data} setData={setData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditVideo;
