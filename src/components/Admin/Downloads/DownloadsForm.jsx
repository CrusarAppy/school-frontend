import React, { useRef, useState } from "react";
import styles from "./DownloadsForm.module.css";
import { Button, Form } from "react-bootstrap";
import { FileArrowUp, FileEarmarkPdf } from "react-bootstrap-icons";
import NepaliInput from "../../Input/NepaliInput";

const DownloadsForm = ({ data, setData, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = {};
    if (data.nepali.title.trim().length < 1) {
      error.npTitle = "Title is Required.";
    }
    if (data.english.title.trim().length < 1) {
      error.enTitle = "Title is Required.";
    }
    if (!data.file.preview) {
      error.file = "Select a file.";
    }
    setErrors(error);
    if (Object.keys(error).length !== 0) {
      return;
    }
    onSubmit();
  };

  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    setData({
      ...data,
      file: {
        raw: file,
        preview: URL.createObjectURL(file),
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.formItem}>
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
          </div>
        </div>

        <div className={styles.formItem}>
          <div className={styles.formItem}>
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
                  setData({ ...data, nepali: { ...data.nepali, title: val } });
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.formItem}>
          <div className={styles.formItem}>
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <div>File*</div>
                {errors.file && (
                  <div className={styles.error}>{errors.file}</div>
                )}
              </div>
              <Form.Control
                type="file"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                onChange={handleFileUpload}
                hidden
                ref={inputRef}
              />
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1em" }}
              >
                <div
                  style={{
                    height: "80px",
                    width: "80px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <FileArrowUp
                    size="lg"
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  />
                  Upload
                </div>
                {data.file.preview && (
                  <div style={{ height: "80px", width: "80px" }}>
                    <a
                      href={data.file.preview}
                      target="__blank"
                      style={{ textAlign: "center" }}
                    >
                      <FileEarmarkPdf size="lg" />
                      View
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1em" }}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadsForm;
