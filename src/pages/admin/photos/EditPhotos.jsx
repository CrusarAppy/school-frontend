import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditPhotos.module.css";
import Loading from "../../../components/Loading/Loading";
import { getPhotoById, updatePhotos } from "../../../utils/api/photoGallery";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import PhotoForm from "../../../components/Admin/Photo/PhotoForm";

const EditPhotos = () => {
  const [data, setData] = useState({
    nepali: { title: "" },
    english: { title: "" },
    images: [],
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const [newImages, setNewImages] = useState([]);
  const assetUrl = useRef(null);
  const deletePhotoIds = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let uploadData = {
      ...data,
      images: newImages,
      deletePhotoIds: deletePhotoIds.current,
    };
    setLoading(true);

    updatePhotos(id, uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/photos/");
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

  const fetchPhotoData = () => {
    setLoading(true);
    getPhotoById(id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        let o = JSON.parse(JSON.stringify(res.data.photo_gallery));
        Object.defineProperty(
          o,
          "images",
          Object.getOwnPropertyDescriptor(o, "photos")
        );
        delete o["photos"];
        setData(o);
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
      fetchPhotoData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const onOldPhotoRemove = (index) => {
    deletePhotoIds.current.push(data.images[index].id);
    setData((prevState) => {
      prevState.images.splice(index, 1);
      return { ...prevState };
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
        imageServerUrl={assetUrl.current}
        deletePhotoIds={deletePhotoIds}
        onOldPhotoRemove={onOldPhotoRemove}
      />
    </div>
  );
};

export default EditPhotos;
