import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

function index() {
  return (
    <>
      <Hero />
      <section className="speakers-area-two ptb-120">
        <div className="container">
          <div className="row">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((dat, i) => (
              <div className="col-lg-4 col-md-6">
                <div className="single-speakers-box">
                  <div className="speakers-image">
                    <img
                      src={require("../../assets/images/speakers1.jpg")}
                      alt="speakers"
                    />
                  </div>

                  <div className="speakers-content">
                    <h3>
                      <Link to="#">James Anderson</Link>
                    </h3>
                    <span>Founder & CEO</span>

                    <ul className="social"></ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default index;
