import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditEvent.module.css";
import Loading from "../../../components/Loading/Loading";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import EventForm from "../../../components/Admin/Event/EventForm";
import { getEventById, updateEvent } from "../../../utils/api/events";

const EditEvent = () => {
  const [data, setData] = useState({
    nepali: {
      title: "",
      description: "",
    },
    english: {
      title: "",
      description: "",
    },
    date: "",
    start_time: "",
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

    updateEvent(id, uploadData)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/events/");
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

  const fetchEventData = () => {
    setLoading(true);
    getEventById(id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        setData(res.data.event);
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
      fetchEventData();
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
      <EventForm
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

export default EditEvent;
