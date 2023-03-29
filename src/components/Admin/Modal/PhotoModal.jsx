import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import RemovableImage from "../Image/RemovableImage";
import { validateImage, imgCompressor } from "../../../utils/image";
import styles from "./PhotoModal.module.css";
import { PlusLg } from "react-bootstrap-icons";

const PhotoModal = ({
  images,
  setImages,
  visible,
  setVisible,
  onNewPhotoRemove,
  imageServerUrl,
  data,
  onOldPhotoRemove,
  onSave,
}) => {
  const inputFile = useRef(null);

  const handleImageUpload = async (e) => {
    var files = e.target.files;
    let newPhotos = [];

    for (var i = 0; i < files.length; i++) {
      var res = validateImage(files[i]);
      if (!(res === true)) {
        // notifyError(res);
        return;
      }
      let compressedImage = await imgCompressor(files[i]);

      newPhotos.push({
        raw: compressedImage,
        preview: URL.createObjectURL(compressedImage),
      });
    }

    setImages((prevState) => newPhotos.concat(prevState));
    e.target.value = null;
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add photos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.modalBody}>
            <div
              className={styles.addImageContainer}
              onClick={() => {
                inputFile.current.click();
              }}
            >
              <PlusLg
                className={styles.image}
                style={{
                  fontSize: "200px",
                }}
              />
              <input
                name="photos"
                type="file"
                ref={inputFile}
                placeholder="photos"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
            {images.map((element, index) => {
              return (
                <div className={styles.imageContainer} key={index}>
                  <RemovableImage
                    imgSrc={element.preview}
                    onRemove={onNewPhotoRemove}
                    index={index}
                  />
                </div>
              );
            })}
            {data &&
              data.images.map((element, index) => {
                return (
                  <div className={styles.imageContainer} key={index}>
                    <RemovableImage
                      imgSrc={imageServerUrl + (element.image || element.photo)}
                      onRemove={onOldPhotoRemove}
                      index={index}
                    />
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {onSave && (
            <Button color="primary" onClick={onSave}>
              Save
            </Button>
          )}
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhotoModal;
