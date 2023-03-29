import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePhotos.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import PhotoForm from "../../../components/Admin/Photo/PhotoForm";
import { uploadPhotos } from "../../../utils/api/photoGallery";

const CreatePhotos = () => {
  const [data, setData] = useState({
    nepali: { title: "" },
    english: { title: "" },
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

    uploadPhotos(uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/photos/list/");
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
      <PhotoForm
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

export default CreatePhotos;
