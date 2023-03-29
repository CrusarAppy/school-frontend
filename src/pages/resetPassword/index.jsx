import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ResetPassword() {
  const { t } = useTranslation("resetpassword");
  return (
    <section className="login-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="login-form">
            <h3>{t("forgot")}</h3>

            <form>
              <div className="form-group">
                <label>{t("email")}</label>
                <input type="email" className="form-control" placeholder={t("email_address")} />
              </div>
              <button type="submit" className="btn btn-primary">
                {t("submit")}
              </button>
              <p>
                <Link to="/login/" className="pull-right">
                  {t("back")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
