import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import locationItems from "../../assets/json/contact-details.json";
import socialItems from "../../assets/json/social-links.json";
import Hero from "../../components/Hero/Hero";

import Loading from "../../components/Loading/Loading";
import { axiosErrorHandler } from "../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../App";

import { storeMessage } from "./../../utils/api/contactUs";
import { Spinner } from "react-bootstrap";
import i18next from "i18next";

function Contact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("contact");
  const { i18n } = useTranslation();
  const [showError, setShowError] = useState(false);

  const handlechange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    setShowError(false);
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const translateValidation = (name) => {
    if (i18next.language === "np") return `आफ्नो ${t(name)} प्रविष्ट गर्नुहोस्`;
    if ((i18next.language = "en")) return `Enter Your ${t(name)}`;
  };

  const onInvalid = (name) => {
    if (showError) {
      if (name === "email" && !validateEmail(contact[name])) {
        return (
          <label className="text-right text-warning" htmlFor={name}>
            {translateValidation(name)}
          </label>
        );
      } else if (!contact[name] && contact[name]?.length < 1) {
        return (
          <label className="text-right text-warning" htmlFor={name}>
            {translateValidation(name)}
          </label>
        );
      }
    }
  };

  const onSubmitContact = (e) => {
    e.preventDefault();

    const isSubmitable = Object.values(contact).every((dat) => dat.length > 1);

    if (isSubmitable) {
      setLoading(true);
      storeMessage({
        name: contact.name,
        email: contact.email,
        phone_number: contact.number,
        subject: contact.subject,
        message: contact.message,
        address: contact.address,
      })
        .then((res) => {
          setContact({
            name: "",
            email: "",
            number: "",
            subject: "",
            message: "",
            address: "",
          });
          notifySuccess("success");
          setLoading(false);
        })
        .catch((err) => {
          axiosErrorHandler(err, notifyError);
          setLoading(false);
        });
      return;
    }
    setShowError(true);
  };

  return (
    <div>
      <Hero />
      <section className="contact-area ptb-120">
        <div className="container">
          <div className="row">
            {locationItems.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="contact-box">
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="content">
                    <h4>{t(item.title)}</h4>
                    {i18n.language === "en" ? (
                      <p>{t(item.details)} </p>
                    ) : (
                      <p style={{ fontFamily: "sans-serif" }}>{t(item.details)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row h-100 align-items-center contact-form">
            <div className="col-lg-4 col-md-12">
              <div className="leave-your-message">
                <h3>{t("message_title")}</h3>
                <p>{t("message_subtitle")}</p>

                <div className="stay-connected">
                  <h3>{t("stay_connected")}</h3>
                  <ul>
                    {socialItems.map((socialItem, index) => (
                      <li key={index}>
                        <Link to={socialItem.path} target="_blank">
                          <i className={socialItem.icon}></i>
                          <span>{t(socialItem.title)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <form id="contactForm">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="name">{t("name")}*</label>
                        {onInvalid("name")}
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        required={true}
                        data-error="Please enter your name"
                        value={contact?.name}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="email">{t("email")}*</label>
                        {onInvalid("email")}
                      </div>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        required={true}
                        data-error="Please enter your email"
                        value={contact?.email}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="number">{t("phone_number")}*</label>
                        {onInvalid("number")}
                      </div>

                      <input
                        type="number"
                        className="form-control"
                        name="number"
                        id="number"
                        required={true}
                        data-error="Please enter your phone number"
                        value={contact?.number}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="address">{t("address")}*</label>
                        {onInvalid("address")}
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        required={true}
                        data-error="Please enter your  address"
                        value={contact?.address}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="address">{t("subject")}*</label>
                        {onInvalid("subject")}
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        required={true}
                        data-error="Please enter your  address"
                        value={contact?.subject}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <div className="contact-label-grid">
                        <label htmlFor="message">{t("message")}*</label>
                        {onInvalid("message")}
                      </div>

                      <textarea
                        name="message"
                        className="form-control"
                        id="message"
                        cols="30"
                        rows="4"
                        required={true}
                        data-error="Write your message"
                        value={contact?.message}
                        onChange={handlechange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <button type="submit" className="btn btn-primary" onClick={onSubmitContact}>
                      {t("send_message")}{" "}
                      {loading ? (
                        <div
                          class="spinner-border"
                          style={{
                            width: "1em",
                            height: "1em",
                            marginLeft: "0.7em",
                          }}
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : null}
                    </button>
                    <div id="msgSubmit" className="h3 text-center hidden"></div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
