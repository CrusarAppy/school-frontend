import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditNotice.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import NoticeForm from "../../../components/Admin/Notice/NoticeForm";
import { getNoticeById, updateNotice } from "../../../utils/api/notices";

const EditNotice = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
      description: "",
    },
    english: {
      title: "",
      description: "",
    },
    images: [],
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const [newImages, setNewImages] = useState([]);
  const assetUrl = useRef(null);
  const deleteImageIds = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
      images: newImages,
      deleteImageIds: deleteImageIds.current,
    };
    setLoading(true);

    updateNotice(id, uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/notices/");
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  const onNewPhotoRemove = (index) => {
    setNewImages((prevState) => {
      let r = prevState.filter((e, i) => {
        if (i !== index) {
          return e;
        }
      });
      return r;
    });
  };

  const fetchNoticeData = () => {
    setLoading(true);
    getNoticeById(id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        setData(res.data.notice);
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
      fetchNoticeData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const onOldPhotoRemove = (index) => {
    deleteImageIds.current.push(data.images[index].id);
    setData((prevState) => {
      prevState.images.splice(index, 1);
      return { ...prevState };
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <NoticeForm
        data={data}
        setData={setData}
        newImages={newImages}
        setNewImages={setNewImages}
        onNewPhotoRemove={onNewPhotoRemove}
        onSubmit={handleSubmit}
        imageServerUrl={assetUrl.current}
        deleteImageIds={deleteImageIds}
        onOldPhotoRemove={onOldPhotoRemove}
      />
    </div>
  );
};

export default EditNotice;
