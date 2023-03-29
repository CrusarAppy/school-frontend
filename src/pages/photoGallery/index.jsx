import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import src from "../../assets/images/about1.jpg";
import src1 from "../../assets/images/press.jpg";
import Hero from "./../../components/Hero/Hero";
import { notifyError, notifySuccess } from "../../App";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import { getDateFromTimestamp } from "../../utils/dateTime/date";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { deletePhoto, getPhotos } from "../../utils/api/photoGallery";
import { useTranslation } from "react-i18next";

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const assetUrl = useRef(null);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchPhotos = () => {
    setLoading(true);
    getPhotos(i18n.language === "en" ? "english" : "nepali")
      .then((res) => {
        if (res.status === "success") {
          setPhotos(res.data.photo_gallery);

          assetUrl.current = res.data.asset_url;
        } else {
          //toast
        }
        setLoading(false);
      })
      .catch((err) => {
        // axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchPhotos();
    }
    return () => {
      mounted = false;
    };
  }, [refresh, i18n.language]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Hero />
      <div className="photo-gallery-container ptb-120">
        <div className="photo-grid container">
          {photos.map((item, index) => (
            <div
              className="photo-card"
              style={{
                backgroundImage: `url(${assetUrl.current + item.photo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "multiply",
                backgroundColor: "#404040",
              }}
              key={index}
              onClick={() =>
                navigate("/media/photogallery/photos/", {
                  state: {
                    id: item.id,
                  },
                })
              }
            >
              {item.title}
              <div className="overlay-wrapper">
                <div className="overlay-left" />
                <div className="overlay-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PhotoGallery;
