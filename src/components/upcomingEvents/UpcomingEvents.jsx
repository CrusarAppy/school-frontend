import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { notifyError } from "../../App";
import { getEvents } from "../../utils/api/events";
import { useTranslation } from "react-i18next";
import { getDateString } from "../../utils/dateTime/date";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { timer } from "../../utils/timer/timer";

const UpcomingEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef("");
  const { i18n } = useTranslation();

  const fetchEvents = () => {
    let language = i18n.language === "en" ? "english" : "nepali";
    setLoading(true);
    getEvents(1, language)
      .then((res) => {
        if (res.status === "success") {
          setData(res.data.events);
          assetUrl.current = res.data.asset_url;
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
      fetchEvents();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const DataRender = () => {
    return (
      <ul>
        {data
          .filter((dat, i) => i < 4)
          .map((item, i) => (
            <li key={i} style={{ marginBottom: "2em" }} data-aos="fade-down-right">
              <Link to={`/events/eventsdetails`} state={{ id: `${item.id}` }}>
                <img
                  style={{
                    objectFit: "cover",
                  }}
                  src={assetUrl.current + item.image}
                  alt="img"
                />
              </Link>

              <h5>
                <Link to={`/events/eventsdetails`} state={{ id: `${item.id}` }} className="card-btn-title">
                  {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
                </Link>
              </h5>
              <p className="date" style={{ fontFamily: "sans-serif" }}>
                {timer(item.created_at, i18n.language)}
              </p>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="widget widget_recent_entries">
      <h3 className="widget-title">{i18n.language === "np" ? "आगामी कार्यक्रमहरू" : "Upcomming Events"}</h3>

      {DataRender()}
    </div>
  );
};

export default UpcomingEvents;
