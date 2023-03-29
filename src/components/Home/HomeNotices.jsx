import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import src from "../../assets/images/blog2.jpg";
import src1 from "../../assets/images/press.jpg";
import src2 from "../../assets/images/blog1.jpg";
import "./../../assets/css/homeEvent/homeEvents.scss";
import SubHeader from "../SubHeader";
import { notifyError, notifySuccess } from "../../App";

import { getNotices } from "./../../utils/api/notices";
import { getDateFromTimestamp } from "./../../utils/dateTime/date";
import { axiosErrorHandler } from "./../../utils/errorHandle/axiosErrorHandler";
import { useTranslation } from "react-i18next";
import { timer } from "../../utils/timer/timer";

const HomeNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef(null);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const { i18n } = useTranslation();
  const { t } = useTranslation(["home", "button"]);

  const navigate = useNavigate();

  const fetchNotices = () => {
    setLoading(true);
    let language = i18n.language === "en" ? "english" : "nepali";
    getNotices(page, language)
      .then((res) => {
        if (res.status === "success") {
          setNotices(res.data.notices);
          if (page === 1) {
            assetUrl.current = res.data.asset_url;
            currentEntries.current = res.data.notices.length;
            lastPage.current = res.data.last_page;
          }
        } else {
          //toast
        }
        setLoading(false);
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotices();
  }, [i18n.language]);

  return (
    <div>
      <section className="blog-area ptb-120 bg-image">
        <div className="container">
          <SubHeader title={t("notice")} color="#ff2d55" bgcolor="#ee8b9de8" />
          <div
            className="event-heading-container"
            data-aos="fade-in"
            data-aos-offset="-400"
            data-aos-delay="0"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className="home-title">{t("latest_notice")}</div>
            <div className="event-arrow" onClick={() => navigate("/news/")}>
              <i class="icofont-arrow-right"></i>
            </div>
          </div>
          <div className="row">
            {notices
              .filter((dat, i) => i < 3)
              .map((item, index) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-offset="-400"
                  data-aos-delay="0"
                  data-aos-duration="700"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="single-blog-post">
                    <div className="blog-image">
                      <Link to="#">
                        <img
                          style={{
                            objectFit: "cover",
                          }}
                          src={assetUrl.current + item.image}
                          alt="blog"
                        />
                      </Link>
                    </div>

                    <div className="blog-post-content">
                      <span className="date">
                        {timer(item.created_at, i18n.language)}
                      </span>
                      <h3>
                        <Link to="#">{item.title}</Link>
                      </h3>
                      <p
                        id="descriptionLineClampBlack"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <Link
                        to={{
                          pathname: `eventdetails`,
                        }}
                        state={{ id: `${index}` }}
                        className="read-more-btn btn-absolute"
                      >
                        {t("read_more", { ns: "button" })}{" "}
                        <i className="icofont-double-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomeNotices;
