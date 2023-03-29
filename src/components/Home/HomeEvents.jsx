import React from "react";
import { useEffect } from "react";

import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../SubHeader";
import "./../../assets/css/homeEvent/homeEvents.scss";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { notifyError } from "../../App";
import { getDateString } from "../../utils/dateTime/date";

import { useTranslation } from "react-i18next";
import { getEvents } from "../../utils/api/events";
import { timer } from "./../../utils/timer/timer";
function HomeEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const lastPage = useRef(1);
  const assetUrl = useRef(null);

  const { i18n } = useTranslation();
  const { t } = useTranslation("home");
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
  useEffect(() => {
    console.log(events, "events");
  }, [events]);
  return (
    <section className="blog-area ptb-120 bg-image">
      <div className="container">
        <div className="home-event-wrapper">
          <SubHeader title={t("events")} color="#0e9bd3" bgcolor="#6fcaeec2" />
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
            <div className="home-title">{t("latest_events")}</div>
            <div
              className="event-arrow"
              onClick={() => {
                navigate("/events/");
              }}
            >
              <i class="icofont-arrow-right"></i>
            </div>
          </div>
          <div className="home-event-container">
            {events
              .filter((dat, i) => i < 4)
              .map((dat, i) => (
                <div
                  key={i}
                  className="home-event-card"
                  data-aos="fade-up"
                  data-aos-offset="-400"
                  data-aos-delay="0"
                  data-aos-duration="700"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                  data-aos-once="false"
                  data-aos-anchor-placement="top-center"
                  onClick={() =>
                    navigate("/events/eventsdetails", {
                      state: { id: `${dat.id}` },
                    })
                  }
                >
                  <div className="event-card-left-calender">
                    <div className="event-card-date" style={{ fontFamily: "sans-serif" }}>
                      {" "}
                      {timer(dat.date, i18n.language).split(" ")[1].split(",")[0]}
                    </div>
                    <div className="event-card-months mt-2" style={{ fontFamily: "sans-serif" }}>
                      {timer(dat.date, i18n.language).split(" ")[0]}{" "}
                    </div>
                  </div>
                  <div className="event-card-right">
                    <div className="event-card-heading">{dat.title}</div>
                    <div
                      className="event-card-description"
                      id="descriptionLineClampBlack"
                      dangerouslySetInnerHTML={{ __html: dat.description }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeEvents;
