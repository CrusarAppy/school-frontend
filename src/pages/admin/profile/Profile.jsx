import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import Loading from "../../../components/Loading/Loading";
import NavbarTitleContext from "../../../contexts/NavbarTitleContext";
import { updatePassword } from "../../../utils/api/adminAuth";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./Profile.module.css";
import cx from "classnames";

function Profile() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const { setNavbarTitle } = useContext(NavbarTitleContext);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = {};
    if (newPassword.trim().length < 1) {
      error.newPassword = "New Password is Required";
    }
    if (confirmPassword.trim().length < 1) {
      error.confirmPassword = "Confirm Password is Required";
    } else if (newPassword !== confirmPassword) {
      error.confirmPassword = "Password doesn't match";
    }
    if (oldPassword.trim().length < 1) {
      error.oldPassword = "Old Password is Required";
    }

    setErr(error);
    if (Object.keys(error).length === 0) {
      setLoading(true);
      updatePassword({ password: newPassword, old_password: oldPassword })
        .then((res) => {
          if (res.status === "success") {
            notifySuccess("Password Changed Successfully");
            navigate("/admin/");
          }
        })
        .catch((err) => {
          axiosErrorHandler(err, notifyError);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setNavbarTitle("Profile");
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <div className={styles.profileTitle}>Change Password</div>
      <div style={{ width: "100%" }}>
        <form
          autoComplete="off"
          className={styles.forms}
          onSubmit={handleSubmit}
        >
          <div className={styles.formItem}>
            <label className={styles.labels}>Old Password</label>
            <div className={styles.inputDiv}>
              <input
                className={cx(
                  styles.input,
                  err.oldPassword ? styles.errorInput : ""
                )}
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <label className={styles.labels}>New Password</label>
            <div className={styles.inputDiv}>
              <input
                className={cx(
                  styles.input,
                  err.newPassword ? styles.errorInput : ""
                )}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <label className={styles.labels}>Confirm Password</label>
            <div className={styles.inputDiv}>
              <input
                className={cx(
                  styles.input,
                  err.confirmPassword ? styles.errorInput : ""
                )}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
