import React, { useEffect, useRef, useState } from "react";
import src from "../../../assets/images/about1.jpg";
import src1 from "../../../assets/images/press.jpg";
import Lightbox from "react-image-lightbox";
import { useLocation } from "react-router-dom";

import Loading from "../../../components/Loading/Loading";
import { getPhotoById, updatePhotos } from "../../../utils/api/photoGallery";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import { useTranslation } from "react-i18next";
import { getByTitle } from "@testing-library/react";

function Photo() {
  const location = useLocation();
  const { i18n } = useTranslation();
  console.log(i18n);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [data, setData] = useState({
    nepali: { title: "" },
    english: { title: "" },
    photos: [],
  });

  const [newImages, setNewImages] = useState([]);
  const assetUrl = useRef(null);
  const deletePhotoIds = useRef([]);
  const [loading, setLoading] = useState(false);

  const fetchPhotoData = () => {
    setLoading(true);
    getPhotoById(location.state.id)
      .then((res) => {
        assetUrl.current = res.data.asset_url;
        setData(res.data.photo_gallery);
        setLoading(false);
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  const handleImageLightbox = (index) => {
    setIsOpen(true);
    setCurrentIndex(index);
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

  ///Method for geting title
  return (
    <div className="photo-gallery-container ptb-120">
      <div className="container">
        <div className="photo-gallery-title photo-title-inside">
          {i18n.language === "en" ? data.english.title : data.nepali.title}
        </div>
        <div className="photo-grid">
          {data.photos.map((item, index) => (
            <div
              className="image-card"
              key={index}
              onClick={() => handleImageLightbox(index)}
            >
              <img src={assetUrl.current + item.photo} className="image" />
            </div>
          ))}
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={assetUrl.current + data.photos[currentIndex].photo}
            nextSrc={
              assetUrl.current +
              data.photos[(currentIndex + 1) % data.photos.length].photo
            }
            prevSrc={
              assetUrl.current +
              data.photos[
                (currentIndex + data.photos.length - 1) % data.photos.length
              ].photo
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setCurrentIndex(
                (currentIndex + data.photos.length - 1) % data.photos.length
              )
            }
            onMoveNextRequest={() =>
              setCurrentIndex((currentIndex + 1) % data.photos.length)
            }
          ></Lightbox>
        )}
      </div>
    </div>
  );
}

export default Photo;
