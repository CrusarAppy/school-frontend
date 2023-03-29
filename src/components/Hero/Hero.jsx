import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import style from "./style.module.css";

function Hero({ title = "Home" }) {
  const location = useLocation();
  const { t } = useTranslation("hero");
  const array = location.pathname.split("/").filter((dat) => dat !== "");

  const urlBetween = (url) => {
    switch (url) {
      case "photogallery":
        return t("photo_gallery");
      case "videogallery":
        return t("video_gallery");
      case "blogsdetails":
        return t("blogs_details");
      case "newsdetails":
        return t("notice_details");
      case "eventsdetails":
        return t("event_details");
      case "news":
        return t("notices");
      case "aboutus":
        return t("about_us");
      case "messagefromprincipal":
        return t("message_from_principal");
      case "ourstaff":
        return t("our_staff");
      case "download":
        return t("downloads");
      default:
        return t(url);
    }
  };

  return (
    <div className="page-title-area item-bg1">
      <div className="container">
        <h1>{urlBetween(array[array.length - 1])}</h1>
        <ul className={style.textDecoration}>
          {array.map((dat, i) => (
            <li key={i} className={style.hoverr}>
              {urlBetween(dat)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hero;
