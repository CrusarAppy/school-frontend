import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import staffImages from "../../assets/json/staffs_images/staff-images.json";

function index() {
  return (
    <>
      <Hero />
      <section className="speakers-area-two ptb-120">
        <div className="container">
          <div className="row">
            {staffImages.map((dat, i) => (
              <div className="col-lg-4 col-md-6">
                <div className="single-speakers-box">
                  <div className="speakers-image">
                    <img
                      src={(dat.background_image)}
                      alt="speakers"
                    />
                  </div>

                  <div className="speakers-content">
                    <h3>
                      <Link to="#">{dat.en_title}</Link>
                    </h3>
                    <span>{dat.en_description}</span>

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
