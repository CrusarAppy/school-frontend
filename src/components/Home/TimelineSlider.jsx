import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import timelinseSliderData from "../../assets/json/timeline-carousel.json";
import { useTranslation } from "react-i18next";
import VisibilitySensor from "react-visibility-sensor";
import cx from "classnames";

const TimelineSlider = () => {
  const ref = React.useRef();
  const { t } = useTranslation("home");

  const [visible, setvisible] = React.useState(false);

  const photoSliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    useTransform: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <div className="year-content" style={{ position: "relative" }}>
        <div className="arrowLeft" onClick={() => ref.current.slickPrev()}>
          <i class="icofont-rounded-left"></i>
        </div>
        <div className="arrowRight" onClick={() => ref.current.slickNext()}>
          <i class="icofont-rounded-right"></i>
        </div>
        <Slider {...photoSliderSettings} ref={ref}>
          {timelinseSliderData.map((element, index) => {
            return (
              <div key={element.id} className="hero-content-list-wrapper" style={{ background: "#452 !important" }}>
                <div
                  className="hero-content-list"
                  style={{
                    backgroundImage: element.background_image,
                  }}
                >
                  <Container style={element.id === 1 ? { display: "static" } : { display: "none" }}>
                    <Row>
                      <VisibilitySensor
                        onChange={(dat) => setvisible(dat)}
                        offset={{
                          top: 10,
                        }}
                        delayedCall
                      >
                        <Col md={8} className={cx("timeline-container", visible ? "timeline-animation" : null)}>
                          <h4>{t("welcome_to")}</h4>
                          <h2>{t("school_name")}</h2>
                        </Col>
                      </VisibilitySensor>
                    </Row>
                  </Container>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default TimelineSlider;
