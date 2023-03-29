import React, { useState } from "react";
import styles from "./BlogForm.module.css";
import { Button, Form } from "react-bootstrap";
import PhotoModal from "../Modal/PhotoModal";
import { ImageFill } from "react-bootstrap-icons";
import RichTextEditor from "../../TextEditor/RichTextEditor";
import NepaliInput from "../../Input/NepaliInput";

const BlogForm = ({
  data,
  setData,
  newImages,
  setNewImages,
  onNewPhotoRemove,
  onSubmit,
  imageServerUrl,
  onOldPhotoRemove,
}) => {
  const [imagesOpen, setImagesOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = {};
    if (data.nepali.title.trim().length < 1) {
      error.npTitle = "Title is Required.";
    }
    if (data.nepali.description.trim().length < 1) {
      error.npDescription = "Description is Required.";
    }
    if (data.english.title.trim().length < 1) {
      error.enTitle = "Title is Required.";
    }
    if (data.english.description.trim().length < 1) {
      error.enDescription = "Description is Required.";
    }
    if (newImages.length + data.images.length === 0) {
      error.photos = "Select atleast one photo";
    }
    setErrors(error);
    if (Object.keys(error).length !== 0) {
      return;
    }
    onSubmit();
  };

  return (
    <div className={styles.container}>
      <PhotoModal
        images={newImages}
        setImages={setNewImages}
        visible={imagesOpen}
        setVisible={setImagesOpen}
        onNewPhotoRemove={onNewPhotoRemove}
        imageServerUrl={imageServerUrl}
        data={data}
        onOldPhotoRemove={onOldPhotoRemove}
      />
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.label}>
            <div>Photos*</div>
            {errors.photos && (
              <div className={styles.error}>{errors.photos}</div>
            )}
          </div>
          <div className={styles.imageWrapper}>
            <ImageFill
              className={styles.imageContainer}
              onClick={() => {
                setImagesOpen(true);
              }}
            />
          </div>
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
          <div className={styles.formGroup}>
            <div className={styles.label}>
              <div>Eng Description*</div>
              {errors.enDescription && (
                <div className={styles.error}>{errors.enDescription}</div>
              )}
            </div>
            <RichTextEditor
              content={data.english.description}
              setContent={(desc) => {
                setData({
                  ...data,
                  english: { ...data.english, description: desc },
                });
              }}
            />
          </div>
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
          <div className={styles.formGroup}>
            <div className={styles.label}>
              <div>Np Description*</div>
              {errors.npDescription && (
                <div className={styles.error}>{errors.npDescription}</div>
              )}
            </div>
            <RichTextEditor
              content={data.nepali.description}
              setContent={(desc) => {
                setData({
                  ...data,
                  nepali: { ...data.nepali, description: desc },
                });
              }}
            />
          </div>
        </div>

        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
