import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "../../components/Hero/Hero";

function About() {
  const { t } = useTranslation("aboutus");
  return (
    <div>
      <Hero />
      <section className="about-area-three ptb-120 bg-image">
        <div className="container">
          <div className="about-margin row h-100 align-items-center">
            <div className="col-lg-6">
              <div className="about-image">
                <img
                  src="/static/img/principal.jpg"
                  className="about-img1"
                  alt="about"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-content">
                <span>{t("about_us")}</span>
                <h2>{t("school_name")}</h2>
                <p>{t("school_about")}</p>
              </div>
            </div>
          </div>

          <div className="row about-margin">
            <div className="col-lg-12">
              <div className="about-content">
                <h2>{t("mission_title")}</h2>
                <p>{t("mission_details")}</p>
                <p>{t("following_details")}</p>
                <ul>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("passion")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("commitment")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("innovative")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("challenges")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("competence")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("creativity")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("leadership")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-sm-12 about-margin">
              <div className="about-content">
                <h2>{t("core_values")}</h2>
                <ul>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("respect")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("excellence")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("collaboration")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("knowledge")}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 about-margin">
              <div className="about-content">
                <h2>{t("school_level")}</h2>
                <ul>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("secondary")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("middle_school")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("primary_school")}
                  </li>
                  <li>
                    <i className="icofont-long-arrow-right"></i>
                    {t("pre_school")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
