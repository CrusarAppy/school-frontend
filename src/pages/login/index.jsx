import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation("login");
  return (
    <div>
      <section className="login-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="login-form">
              <h3>{t("welcome_back")}</h3>

              <form>
                <div className="form-group">
                  <label>{t("email")}</label>
                  <input type="email" className="form-control" placeholder="Email Address" />
                </div>

                <div className="form-group">
                  <label>{t("password")}</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">
                  {t("login")}
                </button>

                <p>
                  <Link to="/signup/" className="pull-left">
                    {t("create")}
                  </Link>

                  <Link to="/resetpassword/" className="pull-right">
                    {t("forgot")}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
