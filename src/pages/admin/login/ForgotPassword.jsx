import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../utils/api/adminAuth";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import { getCookie } from "../../../utils/cookie/cookies";
import Preloader from "../../../components/Loading/Preloader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    forgotPassword({ email: email })
      .then((res) => {
        notifySuccess(res.message);
        navigate("/admin/login/");
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorHandler(err, notifyError);
      });
  }

  return getCookie("adminToken") ? (
    <Navigate to="/admin/dashboard/" />
  ) : loading ? (
    <Preloader />
  ) : (
    <section className="login-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="login-form">
            <h3>Forgot Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <p>
                <NavLink to="/admin/login/" className="pull-right">
                  Back to Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
