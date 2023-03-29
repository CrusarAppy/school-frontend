import React, { useState } from "react";
import styles from "./VideoForm.module.css";
import { Button, Form } from "react-bootstrap";
import NepaliInput from "../../Input/NepaliInput";

const VideoForm = ({ data, setData, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = {};
    if (data.nepali.title.trim().length < 1) {
      error.npTitle = "Title is Required.";
    }
    if (data.english.title.trim().length < 1) {
      error.enTitle = "Title is Required.";
    }
    if (data.video.trim().length < 1) {
      error.video = "Enter video url";
    }
    setErrors(error);
    if (Object.keys(error).length !== 0) {
      return;
    }
    onSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.formItem}>
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <div>Youtube Video Url*</div>
                {errors.video && (
                  <div className={styles.error}>{errors.video}</div>
                )}
              </div>
              <Form.Control
                type="text"
                name="title"
                value={data.video || ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    video: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <div>Eng Title*</div>
                {errors.enTitle && (
                  <div className={styles.error}>{errors.enTitle}</div>
                )}
              </div>
              <Form.Control
                type="text"
                name="title"
                value={data.english.title || ""}
                onChange={(e) => {
                  setData({
                    ...data,
                    english: { ...data.english, title: e.target.value },
                  });
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <div>Np Title*</div>
                {errors.npTitle && (
                  <div className={styles.error}>{errors.npTitle}</div>
                )}
              </div>
              <NepaliInput
                text={data.nepali.title}
                setText={(val) => {
                  setData({
                    ...data,
                    nepali: { ...data.nepali, title: val },
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
