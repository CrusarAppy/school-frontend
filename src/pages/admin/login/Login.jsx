import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/adminAuth";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import { getCookie, setCookie } from "../../../utils/cookie/cookies";
import Preloader from "../../../components/Loading/Preloader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    login({ email: email, password: password })
      .then((res) => {
        notifySuccess("Logged in successfully.");
        setCookie("adminToken", res.data.token);
        setCookie("userId", res.data.user_id);
        navigate("/admin/dashboard/");
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
            <h3>Welcome Back!</h3>

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

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>

              <p>
                <NavLink to="/admin/forgot-password/" className="pull-right">
                  Forgot your password?
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
