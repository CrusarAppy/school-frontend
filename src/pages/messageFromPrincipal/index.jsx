import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "../../components/Hero/Hero";

function MessageFromPrincipal() {
  const { t } = useTranslation("message");
  return (
    <div>
      <Hero />
      <section className="about-area-three ptb-120 bg-image">
        <div className="container">
          <div className="about-margin row h-100 align-items-center">
            <div className="col-lg-4">
              <div className="about-image">
                <img
                  src="/static/img/principal.jpg"
                  className="about-img1"
                  alt="about"
                />
              </div>
            </div>

            <div className="col-lg-8">
              <div className="about-content">
                <span>{t("principal_name")}</span>
                <h2>{t("message_from")}</h2>
                <p>{t("principal_detail_one")}</p>
              </div>
            </div>
            <div className="col-lg-12 mt-5">
              <div className="about-content">
                <p>{t("principal_detail_two")}</p>
                <p>{t("principal_detail_three")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MessageFromPrincipal;
