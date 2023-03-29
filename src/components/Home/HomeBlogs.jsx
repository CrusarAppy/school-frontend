import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "./../../App";
import { deleteBlog, getBlogs } from "../../utils/api/blogs";
import { getDateString } from "../../utils/dateTime/date";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import "./../../assets/css/homeEvent/homeEvents.scss";
import { useTranslation } from "react-i18next";
import { timer } from "../../utils/timer/timer";

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef(null);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation(["home", "button"]);

  const { i18n } = useTranslation();

  const fetchBlogs = () => {
    setLoading(true);
    getBlogs(page, i18n.language === "en" ? "english" : "nepali")
      .then((res) => {
        if (res.status === "success") {
          setBlogs(res.data.blogs);
          if (page === 1) {
            assetUrl.current = res.data.asset_url;
            currentEntries.current = res.data.blogs.length;
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
    let mounted = true;
    if (mounted) {
      fetchBlogs();
    }
    return () => {
      mounted = false;
    };
  }, [page, refresh]);

  return (
    <div>
      <section className="blog-area ptb-120 bg-image">
        <div className="container">
          <div className="sub-header">{t("blogs")}</div>
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
            <div className="home-title">{t("latest_blogs")}</div>
            <div className="event-arrow" onClick={() => navigate("/blogs/")}>
              <i class="icofont-arrow-right"></i>
            </div>
          </div>
          <div className="row">
            {blogs
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
                  s
                >
                  <div className="single-blog-card ">
                    <Link to="#">
                      <img
                        id="ar13"
                        style={{
                          objectFit: "cover",
                        }}
                        src={assetUrl.current + item.image}
                        alt="blog"
                      />
                    </Link>

                    <div className="post-tag">
                      <Link to="#" style={{ fontFamily: "sans-serif" }}>
                        {timer(item.created_at, i18n.language).split(",")[0]}
                      </Link>
                    </div>

                    <div className="blog-post-content">
                      <h3>
                        <Link
                          to={{
                            pathname: `newsdetails`,
                          }}
                          state={{ id: `${index}` }}
                        >
                          {item.title}
                        </Link>
                      </h3>
                      {/* <p>{item.description}</p> */}
                      <Link
                        to={{
                          pathname: `/news/newsdetails`,
                        }}
                        state={{ id: `${item.id}` }}
                        className="read-more-btn"
                      >
                        {t("read_more", { ns: "button" })} <i className="icofont-double-right"></i>
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

export default HomeBlogs;
