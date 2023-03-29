import cx from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Topnav.module.css";

function Topnav() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("topNav");

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="/img/logoambika.png" className={styles.imageContainer} />
          <div className={styles.schoolName}>{t("school")}</div>
        </div>
        <div className={styles.languageContainer}>
          <div
            className={cx(styles.language, i18n.language === "en" ? styles.lang : null)}
            onClick={() => changeLanguage("en")}
          >
            English
          </div>
          <div
            className={cx(styles.language, i18n.language === "np" ? styles.lang : null)}
            onClick={() => changeLanguage("np")}
          >
            Nepali
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnav;
