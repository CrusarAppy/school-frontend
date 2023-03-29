import React, { useEffect, useRef, useState } from "react";
import PDFViewerThumbnail from "../../components/PDFViewer/PDFViewerThumbnail";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import { useTranslation } from "react-i18next";
import { timer } from "./../../utils/timer/timer";
import { getDownloads } from "./../../utils/api/downloads";
import Pagination from "../../components/Pagination";

const pdfList = [
  {
    title: "School Leaving Certificate",
    date: " 2020/2/23",
    id: "1",
    path: "/pdf/rules_and_regulations.pdf",
  },
  {
    title: "School Not Leaving Certificate",
    date: "2020/2/23",
    id: "2",
    path: "/pdf/rules_and_regulations.pdf",
  },
];

function Download() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("button");
  const currentEntries = useRef(0);

  const lastPage = useRef(1);
  const assetUrl = useRef(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchdownloads = () => {
    setLoading(true);
    getDownloads(page, i18n.language === "en" ? "english" : "nepali")
      .then((res) => {
        if (res.status === "success") {
          setDownloads(res.data.downloads);
          console.log(res.data.downloads);
          if (page === 1) {
            currentEntries.current = res.data.downloads.length;
            lastPage.current = res.data.last_page;
            assetUrl.current = res.data.asset_url;
          }
        } else {
          //toast
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchdownloads();
    }
    return () => {
      mounted = false;
    };
  }, [page, refresh, i18n.language]);

  return (
    <div>
      <Hero />
      <section className="ptb-120">
        <div className="container">
          {downloads.map((item, index) => (
            <div className="download-card" key={index}>
              {/* <div className="download-photos">
                <PDFViewerThumbnail fileUrl={assetUrl.current + item.file} />
                <img src={assetUrl.current + item.file}></img>
              </div> */}
              <div className="download-details">
                <div className="download-container">
                  <div className="download-title">{item.title}</div>
                  <div className="download-date" style={{ fontFamily: "sans-serif" }}>
                    <i class="icofont-ui-calendar"></i>
                    {timer(item.created_at, i18n.language)}
                  </div>
                </div>
                <div className="download-button-container">
                  <a href={assetUrl.current + item.file} download target="_blank">
                    <button className="icon-button-container btn btn-primary">
                      <i class="icofont-file-pdf pdf-download"></i>

                      {t("download")}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination page={page} setPage={setPage} lastPage={lastPage.current} />
      </section>
    </div>
  );
}

export default Download;
