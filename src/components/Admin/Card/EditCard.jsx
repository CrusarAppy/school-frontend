import React from "react";
import styles from "./EditCard.module.css";
import cx from "classnames";
import { Trash, Pencil, Calendar, Eye } from "react-bootstrap-icons";

const EditCard = ({
  title,
  date,
  photo,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  return (
    <div className={cx([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          {photo && <img src={photo} className={styles.images} alt="" />}
        </div>
        <div className={styles.badgeWrapper}>
          <div
            className={cx([styles.dangerBadge, styles.badgeAnime])}
            onClick={handleDelete}
          >
            <Trash />
          </div>
          {handleEdit && (
            <div
              className={cx([styles.primaryBadge, styles.badgeAnime])}
              onClick={handleEdit}
            >
              <Pencil />
            </div>
          )}
          {handleView && (
            <div
              className={cx([styles.primaryBadge, styles.badgeAnime])}
              onClick={handleView}
            >
              <Eye />
            </div>
          )}
        </div>
        <div className={styles.dateWrapper}>
          <Calendar />
          <div className={styles.dateText}>{date}</div>
        </div>
      </div>

      <div className={styles.textWrapper}>
        <h1 className={styles.text}>{title}</h1>
      </div>
    </div>
  );
};

export default EditCard;
