import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      navbar: require("./locales/en/navbar.json"),
      topNav: require("./locales/en/topNav.json"),
      footer: require("./locales/en/footer.json"),
      contact: require("./locales/en/contact.json"),
      login: require("./locales/en/login.json"),
      signup: require("./locales/en/signup.json"),
      resetpassword: require("./locales/en/resetpassword.json"),
      aboutus: require("./locales/en/aboutus.json"),
      message: require("./locales/en/message.json"),
      hero: require("./locales/en/hero.json"),
      home: require("./locales/en/home.json"),
      button: require("./locales/en/button.json"),
    },
    np: {
      navbar: require("./locales/np/navbar.json"),
      topNav: require("./locales/np/topNav.json"),
      footer: require("./locales/np/footer.json"),
      contact: require("./locales/np/contact.json"),
      aboutus: require("./locales/np/aboutus.json"),
      login: require("./locales/np/login.json"),
      signup: require("./locales/np/signup.json"),
      resetpassword: require("./locales/np/resetpassword.json"),
      message: require("./locales/np/message.json"),
      hero: require("./locales/np/hero.json"),
      home: require("./locales/np/home.json"),
      button: require("./locales/np/button.json"),
    },
  },
  ns: [
    "navbar",
    "topNav",
    "footer",
    "contact",
    "login",
    "signup",
    "resetpassword",
    "aboutus",
    "message",
    "hero",
    "home",
    "button",
  ],
  defaultNS: "translations",
});

i18n.languages = ["en", "np"];

export default i18n;
