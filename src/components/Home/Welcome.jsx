import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const { t } = useTranslation(["home", "button"]);
  return (
    <section className="about-area-three ptb-120 bg-image" style={{ paddingBottom: "0" }}>
      <div
        className="container"
        data-aos="fade-in"
        data-aos-offset="-200"
        data-aos-delay="0"
        data-aos-duration="700"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <div className="about-margin row h-100 align-items-center">
          <div className="col-lg-5">
            <div className="about-image">
              <img
                src="/static/img/assBuilding.jpg"
                className="about-img1"
                alt="about"
              />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="about-content">
              <span>{t("welcome_to")}</span>
              <h2>{t("school_name")}</h2>
              <p>{t("school_about")}</p>
              <button className="btn btn-primary" style={{ margin: "1em 0em" }} onClick={() => navigate("/aboutus/")}>
                {t("read_more", { ns: "button" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
