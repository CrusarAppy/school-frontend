import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateDownloads.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import DownloadsForm from "../../../components/Admin/Downloads/DownloadsForm";
import { createDownloads } from "../../../utils/api/downloads";

const CreateDownloads = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
    },
    english: {
      title: "",
    },
    file: {},
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
    };
    setLoading(true);

    createDownloads(uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/downloads/");
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
      <DownloadsForm data={data} setData={setData} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateDownloads;
