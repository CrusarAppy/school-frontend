import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditDownloads.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import {
  getDownloadsById,
  updateDownloads,
} from "../../../utils/api/downloads";
import DownloadsForm from "../../../components/Admin/Downloads/DownloadsForm";

const EditDownloads = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
    },
    english: {
      title: "",
    },
    file: {},
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

    updateDownloads(id, uploadData)
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

  const fetchDownloadsData = () => {
    setLoading(true);
    getDownloadsById(id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        setData({
          ...res.data.downloads,
          file: { preview: res.data.asset_url + res.data.downloads.file },
        });
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
      fetchDownloadsData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <DownloadsForm data={data} setData={setData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditDownloads;
