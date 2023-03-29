import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateNotice.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import NoticeForm from "../../../components/Admin/Notice/NoticeForm";
import { createNotice } from "../../../utils/api/notices";

const CreateNotice = () => {
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

  const navigate = useNavigate();
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
      images: newImages,
    };
    setLoading(true);

    createNotice(uploadData)
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
      />
    </div>
  );
};

export default CreateNotice;
