import React, { useState } from "react";
import { Row } from "react-bootstrap";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import VisibilitySensor from "react-visibility-sensor";
import "./../../assets/css/homeEvent/funfact.scss";

const FunFact = () => {
  const [didViewCountUp, setDidViewCountUp] = useState(false);
  const { t } = useTranslation("home");

  const data = [
    {
      icon: "icofont-focus",
      name: t("Number of student"),
      number: 700,
    },
    {
      icon: "icofont-microphone",
      name: t("excellence"),
      number: 100,
    },
    {
      icon: "icofont-copy",
      name: t("service"),
      number: 100,
    },
    {
      icon: "icofont-users-social",
      name: t("years_of_experience"),
      number: 55,
    },
  ];

  return (
    <section className="funfacts-area ptb-120">
      <div className="container">
        <Row>
          {data.map((dat, i) => (
            <div className="col-lg-3 col-6 col-sm-6">
              <div className="single-funfact" key={i}>
                <div className="icon">
                  <i className={`${dat.icon}`}></i>
                </div>
                <h3 className="odometer">
                  <VisibilitySensor
                    onChange={(dat) => setDidViewCountUp(dat)}
                    offset={{
                      top: 10,
                    }}
                    delayedCall
                  >
                    <CountUp start={0} end={didViewCountUp ? dat.number : 0} duration={2} />
                  </VisibilitySensor>
                  {dat.name === "YEARS OF EXPERIENCE" ? null : "%"}
                </h3>
                <p>{dat.name}</p>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FunFact;
