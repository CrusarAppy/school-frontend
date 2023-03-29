import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import src from "../../assets/images/blog2.jpg";
import src1 from "../../assets/images/press.jpg";
import src2 from "../../assets/images/blog1.jpg";
import Pagination from "../../components/Pagination";
import Hero from "../../components/Hero/Hero";
import { useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { getEvents } from "../../utils/api/events";
import { useEffect } from "react";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { notifyError } from "../../App";
import Loading from "../../components/Loading/Loading";
import { getDateFromTimestamp, getDateString } from "../../utils/dateTime/date";
import { timer } from "../../utils/timer/timer";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const lastPage = useRef(1);
  const assetUrl = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { i18n } = useTranslation();
  const { t } = useTranslation("button");

  useEffect(() => {
    let mounted = true;
    let language = i18n.language === "en" ? "english" : "nepali";

    const fetchEvents = async () => {
      setLoading(true);
      await getEvents(page, language)
        .then((res) => {
          if (res.status === "success") {
            if (page === 1) {
              lastPage.current = res.data.last_page;
              assetUrl.current = res.data.asset_url;
            } else {
            }
          }
          setEvents(res.data.events);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          axiosErrorHandler(err, notifyError);
        });
    };
    if (mounted) {
      fetchEvents();
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
            {events.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="single-blog-post">
                  <div className="blog-image">
                    <Link to="#">
                      <img src={assetUrl.current + item.image} alt="blog" />
                    </Link>
                  </div>

                  <div className="blog-post-content">
                    <span className="date" style={{ fontFamily: "sans-serif" }}>
                      {timer(item.date, i18n.language)}
                    </span>
                    <h3>
                      <Link to="#" className="blog-title-lineclamp">
                        {item.title}
                      </Link>
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                      id="descriptionLineClampBlack"
                    ></p>
                    <Link
                      to={`/events/eventsdetails`}
                      state={{ id: `${item.id}` }}
                      className="read-more-btn btn-absolute"
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

export default Events;
