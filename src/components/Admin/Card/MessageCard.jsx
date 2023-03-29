import React from "react";
import styles from "./MessageCard.module.css";
import cx from "classnames";
import { Eye } from "react-bootstrap-icons";
import { getDateFromTimestamp } from "../../../utils/dateTime/date";
import { Calendar } from "react-bootstrap-icons";

export default function MessageCard({ data, showColumn, onView }) {
  return (
    <div className={cx([styles.wrapper, styles.wrapperAnime])}>
      <div className={styles.header}>
        <div className={styles.messageWrapper}>
          {showColumn.map((element, index) => {
            return (
              <div className={styles.message} key={index}>
                <div className={styles.messageKey}>{element + " :"}</div>
                <div className={styles.messageValue}>
                  {data[[element]] || ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>
          <Calendar />
          {getDateFromTimestamp(data.created_at)}
        </h1>
        <div className={styles.badgeWrapper}>
          <div
            className={cx([
              styles.primaryBadge,
              styles.badgeAnime,
              data.read_status === 0 ? styles.unread : styles.read,
            ])}
            onClick={onView}
          >
            <Eye />
          </div>
        </div>
      </div>
    </div>
  );
}
