import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Signup() {
  const { t } = useTranslation("signup");
  return (
    <section className="signup-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="signup-form">
            <h3>{t("create")}</h3>

            <form>
              <div className="form-group">
                <label>{t("username")}</label>
                <input type="text" className="form-control" placeholder={t("username")} />
              </div>

              <div className="form-group">
                <label>{t("email")}</label>
                <input type="email" className="form-control" placeholder={t("email_address")} />
              </div>

              <div className="form-group">
                <label>{t("password")}</label>
                <input type="password" className="form-control" placeholder={t("password")} />
              </div>

              <button type="submit" className="btn btn-primary">
                {t("signup")}
              </button>

              <p>
                {t("register")} <Link to="/login/">{t("login")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
