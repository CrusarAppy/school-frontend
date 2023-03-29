import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import locationItems from "../../assets/json/contact-details.json";
import socialItems from "../../assets/json/social-links.json";

const navItems = [
  {
    title: "about_us",
    path: "/aboutus/",
  },
  {
    title: "news",
    path: "/news/",
  },
  {
    title: "events",
    path: "/events/",
  },
  {
    title: "gallery",
    path: "/photogallery/",
  },
  {
    title: "downloads",
    path: "/download/",
  },
  { title: "termsandconditions", path: "/termsandcondition/" },
];
function Footer() {
  const { t } = useTranslation("footer");
  const { i18n } = useTranslation();
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-footer-widget">
              <h3>{t("location")}</h3>
              {locationItems.map((item, index) => (
                <p className="location" key={index}>
                  <i class={item.icon}></i>{" "}
                  {i18n.language === "en" ? (
                    <span>{t(item.title)}</span>
                  ) : (
                    <span style={{ fontFamily: "sans-serif" }}>{t(item.title)}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="single-footer-widget">
              <h3>{t("social_connection")}</h3>
              <p>{t("social_connection_description")}</p>

              <ul className="social-links">
                {socialItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className={item.classname} target="_blank">
                      <i className={item.icon}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="copyright-area">
              <div className="logo">
                <Link to="/">
                  <img src="/img/logoambika.png" alt="logo" style={{ height: "70px" }} />
                </Link>
              </div>
              <ul>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}>{t(item.title)}</Link>
                  </li>
                ))}
              </ul>
              {i18n.language === "en" ? (
                <p>
                  {t("copyright_first")} <i className="icofont-copyright"></i> {t("copyright_second")}
                </p>
              ) : (
                <p>
                  <span style={{ fontFamily: "sans-serif" }}>२०२२</span> श्री अम्बिका माध्यमिक विद्यालय। सबै अधिकार
                  आरक्षित
                </p>
              )}
              <p>
                {t("powered_by")}{" "}
                <a href="/" target="_blank" className="powered-by">
                  CrusarAppy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
