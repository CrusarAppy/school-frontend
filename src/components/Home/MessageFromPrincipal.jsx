import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function MessageFromPrincipal() {
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
          <div className="col-lg-4">
            <div className="about-image">
              <img
                src="/static/img/eventPrincipal.jpg"
                className="about-img1"
                alt="about"
              />
            </div>
          </div>

          <div className="col-lg-8 order-first">
            <div className="about-content">
              <span>{t("principal_name")}</span>
              <h2>{t("principal_message")}</h2>
              <p>{t("principal_message_detail")}</p>
              <button
                className="btn btn-primary"
                style={{ margin: "1em 0em" }}
                onClick={() => navigate("/aboutus/messagefromprincipal/")}
              >
                {t("read_more", { ns: "button" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageFromPrincipal;
