import React from "react";
import { Link, useLocation } from "react-router-dom";
import Hero from "../../../components/Hero/Hero";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getEventDetails } from "../../../utils/api/events";
import { useRef } from "react";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError } from "../../../App";
import Loading from "../../../components/Loading/Loading";
import { getDateString } from "../../../utils/dateTime/date";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import UpcomingEvents from "../../../components/upcomingEvents/UpcomingEvents";
import { convertTo12hrs, timer } from "../../../utils/timer/timer";

function EventDetails() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const assetUrl = useRef(null);

  const { i18n } = useTranslation();

  const location = useLocation();

  const sliderSetting = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <i class="icofont-arrow-right"></i>,
    prevArrow: <i class="icofont-arrow-left"></i>,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const handleClick = (id) => {
    setCurrentImage(id);
    setIsOpen(true);
  };

  useEffect(() => {
    let mounted = true;
    let language = i18n.language === "en" ? "english" : "nepali";

    const fetchEvent = async () => {
      setLoading(true);
      await getEventDetails(location.state.id, language)
        .then((res) => {
          if (res.status === "success") {
            assetUrl.current = res.data.asset_url;
            console.log(res.data.event);
            setEvents(res.data.event);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          axiosErrorHandler(err, notifyError);
        });
    };

    if (mounted) {
      fetchEvent();
    }

    return () => {
      mounted = false;
    };
  }, [i18n.language, location.state.id]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Hero />
      <section className="blog-details-area ptb-120">
        <div className="container">
          <div className="row">
            {events && (
              <div className="col-lg-8">
                <div className="blog-details">
                  <Slider {...sliderSetting}>
                    {events.images.map((image, index) => (
                      <div className="post-image" key={index} onClick={() => handleClick(index)}>
                        <img src={assetUrl.current + image.image} alt="blog" />
                      </div>
                    ))}
                  </Slider>

                  <h3>{events.title}</h3>

                  <div className="blog-meta">
                    <ul>
                      <li style={{ fontFamily: "sans-serif" }}>
                        <i className="icofont-calendar"></i> {timer(events.date, i18n.language)}
                      </li>
                      <li>
                        <i className="icofont-clock-time"></i> {convertTo12hrs(events.start_time)}
                      </li>
                    </ul>
                  </div>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: events.description,
                    }}
                    id="descriptionLineClampBlack"
                  ></p>
                </div>

                <div className="post-tag-media">
                  <div className="row h-100 align-items-center">
                    <div className="col-lg-6"></div>

                    <div className="col-lg-6">
                      <ul className="social-share">
                        <li>
                          <span>{i18n.language === "en" ? "Share on" : "सेयर गर्नुहोस्"}:</span>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="icofont-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="icofont-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="icofont-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="icofont-linkedin"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-4">
              <div className="sidebar">
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <Lightbox
          mainSrc={new URL(events.images[currentImage].image, assetUrl.current).href}
          nextSrc={new URL(events.images[(currentImage + 1) % events.images.length].image, assetUrl.current).href}
          prevSrc={
            new URL(
              events.images[(currentImage + events.images.length - 1) % events.images.length].image,
              assetUrl.current
            ).href
          }
          onMoveNextRequest={() => setCurrentImage((currentImage + 1) % events.images.length)}
          onMovePrevRequest={() => setCurrentImage((currentImage + events.images.length - 1) % events.images.length)}
          onCloseRequest={() => setIsOpen(false)}
        ></Lightbox>
      )}
    </div>
  );
}

export default EventDetails;
