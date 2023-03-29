import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../../../components/Hero/Hero";
import { useLocation } from "react-router-dom";
import { getBlogDetails } from "./../../../utils/api/blogs";
import { useTranslation } from "react-i18next";
import { getDateString } from "./../../../utils/dateTime/date";
import Slider from "react-slick/lib/slider";
import Lightbox from "react-image-lightbox";
import UpcomingEvents from "./../../../components/upcomingEvents/UpcomingEvents";
import { timer } from "../../../utils/timer/timer";

function BlogsDetail() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [currentPhoto, setcurrentPhoto] = useState(0);

  const [openViewer, setOpenViewer] = useState(false);
  const assetUrl = useRef(null);
  const [Blogs, setBlogs] = useState({
    nepali: {},
    english: {},
  });
  const { i18n } = useTranslation();

  useEffect(async () => {
    await fetchData();
  }, [location.state.id]);

  const fetchData = () => {
    getBlogDetails(location.state.id, i18n.language === "en" ? "english" : "nepali")
      .then((res) => {
        if (res.status === "success") {
          assetUrl.current = res.data.asset_url;
          setBlogs(res.data.blog);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  console.log(Blogs);

  const sliderConfig1 = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-custom-dots",
    appendDots: (dots) => <ul>{dots}</ul>,
  };

  const getLanguage = () => {
    return i18n.language === "en" ? "english" : "nepali";
  };

  return (
    <div>
      <Hero />
      <section className="blog-details-area ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details">
                <Slider {...sliderConfig1}>
                  {Blogs?.images?.map((element, index) => (
                    <div
                      className="post-image"
                      key={element.id}
                      onClick={() => {
                        setOpenViewer((dat) => !dat);
                        setcurrentPhoto(index);
                      }}
                    >
                      <img src={assetUrl.current + element.image} alt="study" />
                    </div>
                  ))}
                </Slider>

                <h3>{Blogs.title}</h3>

                <div className="blog-meta">
                  <ul>
                    <li style={{ fontFamily: "sans-serif" }}>
                      <i className="icofont-clock-time"></i> {timer(Blogs.created_at, i18n.language)}
                    </li>
                  </ul>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: Blogs?.description,
                  }}
                ></div>

                {/* <blockquote className="blockquote">
                  <p>
                    There are many variations of passages of Lorem the Ipsum
                    available but the that as that majority have is suffered
                    alteration.
                  </p>
                </blockquote> */}
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

            <div className="col-lg-4">
              <div className="sidebar">
                {/* <div className="widget widget_categories">
                  <h3 className="widget-title">Categories</h3>

                  <ul>
                    <li>
                      <Link to="#">AJAX</Link>
                    </li>
                    <li>
                      <Link to="#">Apache</Link>
                    </li>
                    <li>
                      <Link to="#">CSS</Link>
                    </li>
                    <li>
                      <Link to="#">PHP</Link>
                    </li>
                    <li>
                      <Link to="#">Django</Link>
                    </li>
                    <li>
                      <Link to="#">Error</Link>
                    </li>
                    <li>
                      <Link to="#">IIS</Link>
                    </li>
                    <li>
                      <Link to="#">JavaScript</Link>
                    </li>
                  </ul>
                </div> */}

                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </section>
      {openViewer && (
        <Lightbox
          style={{ zIndex: "2000", padding: "1em" }}
          mainSrc={new URL(Blogs.images[currentPhoto].image, assetUrl.current).href}
          nextSrc={new URL(Blogs.images[(currentPhoto + 1) % Blogs.images.length].image, assetUrl.current).href}
          prevSrc={
            new URL(
              Blogs.images[(currentPhoto + Blogs.images.length - 1) % Blogs.images.length].image,
              assetUrl.current
            ).href
          }
          onCloseRequest={() => setOpenViewer(false)}
          onMovePrevRequest={() => setcurrentPhoto((currentPhoto + Blogs.images.length - 1) % Blogs.images.length)}
          onMoveNextRequest={() => setcurrentPhoto((currentPhoto + 1) % Blogs.images.length)}
        />
      )}
    </div>
  );
}

export default BlogsDetail;
