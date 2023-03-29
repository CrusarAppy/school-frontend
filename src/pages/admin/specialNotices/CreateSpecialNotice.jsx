import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSpecialNotice.module.css";
import Loading from "../../../components/Loading/Loading";
import { createSpecialNotice } from "../../../utils/api/specialNotice";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import { notifyError, notifySuccess } from "../../../App";
import { imgCompressor } from "../../../utils/image";
import { validateImage } from "../../../utils/image";
import { Pencil } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const CreateSpecialNotice = () => {
  const [data, setData] = useState({
    photo: { raw: null, preview: "" },
    expiry_date: "",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let err = {};
    if (data.expiry_date.length === 0) {
      err.expiry_date = "Expiry date is required.";
    }
    if (!data.photo.raw) {
      err.photo = "Select a photo.";
    }
    setError(err);
    if (Object.keys(err).length > 0) {
      return;
    }
    setLoading(true);

    createSpecialNotice(data)
      .then((res) => {
        notifySuccess("success");
        setLoading(false);
        navigate("/admin/special-notices/");
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  const imageRef = useRef(null);

  const handleImageUpload = async (e) => {
    var files = e.target.files[0];
    var res = validateImage(files);
    if (!(res === true)) {
      notifyError("Invalid file.");
      return;
    }

    let compressedImage = await imgCompressor(files);
    setData({
      ...data,
      photo: {
        raw: compressedImage,
        preview: URL.createObjectURL(compressedImage),
      },
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          <input
            type="file"
            name="image"
            placeholder="image"
            style={{ display: "none" }}
            ref={imageRef}
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageUpload}
          />
          {data.photo.raw && (
            <img
              src={data.photo.preview}
              alt="Upload photo"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}
          <div className={styles.overlay}>
            <div
              className={styles.changeImage}
              onClick={() => imageRef.current.click()}
            >
              <Pencil className={styles.icon} />
              Upload
            </div>
          </div>
        </div>
        {error.photo && <div className={styles.error}>{error.photo}</div>}
      </div>
      <div className={styles.expiryDate}>
        <div className={styles.labelContainer}>
          <label htmlFor="expirydate" className={styles.label}>
            Expiry Date
          </label>
          {error.expiry_date && (
            <div className={styles.error}>{error.expiry_date}</div>
          )}
        </div>

        <div>
          <input
            type="date"
            id="expirydate"
            name="expirydate"
            autoComplete="nope"
            className={styles.input}
            value={data.expiry_date}
            onChange={(e) => setData({ ...data, expiry_date: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default CreateSpecialNotice;
