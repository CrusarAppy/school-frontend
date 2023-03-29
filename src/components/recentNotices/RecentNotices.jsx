import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { notifyError } from "../../App";
import { RectangleS } from "../../components/Skeleton";
import { getNotices } from "../../utils/api/notices";
import { getDateString } from "../../utils/dateTime/date";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";

const RecentNotices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef("");

  const fetchNotices = () => {
    setLoading(true);
    getNotices()
      .then((res) => {
        if (res.status === "success") {
          setData(
            res.data.notices.slice(
              0,
              res.data.notices.length >= 5 ? 4 : res.data.notices.length
            )
          );
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
      fetchNotices();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const LoadingCheck = () => (
    <ul>
      {[...new Array(3)].map((dat, i) => (
        <div key={i} style={{ display: "flex" }}>
          <div style={{ width: "10%", marginLeft: "1em" }}>
            <RectangleS count={3} height={1} mb={1} />
          </div>
          <div style={{ width: "80%", marginLeft: "1em" }}>
            <RectangleS count={1} height={1} mb={1.2} />
            <RectangleS count={1} height={1} />
          </div>
        </div>
      ))}
    </ul>
  );

  const DataRender = () => {
    return (
      <ul>
        {data.map((item, i) => (
          <li key={i} style={{ marginBottom: "2em" }}>
            <Link to={`/notice/${item.id}`}>
              <img src={assetUrl.current + item.photo} alt="img" />
            </Link>

            <h5>
              <Link to={`/events/${item.id}`} className="card-btn-title">
                {item.title.length > 25
                  ? item.title.slice(0, 25) + "..."
                  : item.title}
              </Link>
            </h5>
            <p className="date">{getDateString(item.created_at)}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="widget widget_recent_entries">
      <h3 className="widget-title">Recent Notices</h3>

      {loading ? LoadingCheck() : DataRender()}
    </div>
  );
};

export default RecentNotices;
