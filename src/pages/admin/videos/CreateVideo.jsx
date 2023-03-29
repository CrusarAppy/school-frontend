import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateVideo.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import VideoForm from "../../../components/Admin/Video/VideoForm";
import { uploadVideo } from "../../../utils/api/videoGallery";

const CreateVideo = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
    },
    english: {
      title: "",
    },
    video: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
    };
    setLoading(true);

    uploadVideo(uploadData)
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

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <VideoForm data={data} setData={setData} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateVideo;
