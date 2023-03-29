import React from "react";
import { Link, useNavigate } from "react-router-dom";
import src from "../../assets/images/blog2.jpg";
import src1 from "../../assets/images/press.jpg";
import src2 from "../../assets/images/blog1.jpg";
import Pagination from "../../components/Pagination";
import Hero from "../../components/Hero/Hero";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getNotices } from "../../utils/api/notices";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { notifyError } from "../../App";
import Loading from "../../components/Loading/Loading";
import { getDateString } from "../../utils/dateTime/date";
import { timer } from "../../utils/timer/timer";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const lastPage = useRef(1);
  const assetUrl = useRef(null);

  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { t } = useTranslation("button");

  useEffect(() => {
    let mounted = true;
    let language = i18n.language === "en" ? "english" : "nepali";
    const fetchNotices = async () => {
      setLoading(true);
      await getNotices(page, language)
        .then((res) => {
          if (res.status === "success") {
            if (page === 1) {
              lastPage.current = res.data.last_page;
              assetUrl.current = res.data.asset_url;
            } else {
            }
          }
          setNotices(res.data.notices);
          console.log(res.data.notices);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          axiosErrorHandler(err, notifyError);
        });
    };
    if (mounted) {
      fetchNotices();
    }
    return () => (mounted = false);
  }, [page, i18n.language]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Hero />
      <section className="blog-area ptb-120 bg-image">
        <div className="container">
          <div className="row">
            {notices.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="single-blog-card ">
                  <Link to="#">
                    <img
                      style={{ aspectRatio: "1/0.6", objectFit: "cover" }}
                      src={assetUrl.current + item.image}
                      alt="blog"
                    />
                  </Link>

                  <div className="post-tag">
                    <Link to="#" style={{ fontFamily: "sans-serif" }}>
                      {timer(item.created_at, i18n.language)}
                    </Link>
                  </div>

                  <div className="blog-post-content">
                    <h3>
                      <Link
                        to={{
                          pathname: `newsdetails`,
                        }}
                        state={{ id: `${item.id}` }}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    {/* <p
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    ></p> */}
                    <Link
                      to={{
                        pathname: `/news/newsdetails`,
                      }}
                      state={{ id: `${item.id}` }}
                      className="read-more-btn"
                    >
                      {t("read_more")} <i className="icofont-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination page={page} setPage={setPage} lastPage={lastPage.current} />
      </section>
    </>
  );
}

export default Notices;
