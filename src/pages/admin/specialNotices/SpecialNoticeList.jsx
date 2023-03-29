import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import EditCard from "../../../components/Admin/Card/EditCard";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import {
  deleteSpecialNotice,
  getSpecialNotice,
} from "../../../utils/api/specialNotice";
import { getDateFromTimestamp } from "../../../utils/dateTime/date";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./SpecialNoticeList.module.css";

const SpecialNoticeList = () => {
  const [specialNotices, setSpecialNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef(null);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = (id) => {
    dialogRef.current = {
      title: "Are you sure?",
      body: "This will delete the item.",
      onSave: () => {
        setLoading(true);
        deleteSpecialNotice(id)
          .then((res) => {
            notifySuccess("Deleted successfully.");
            setDialogVisible(false);
            setRefresh(!refresh);
          })
          .catch((err) => {
            axiosErrorHandler(err, notifyError);
            setLoading(false);
          });
      },
    };
    setDialogVisible(true);
  };

  const fetchspecialNotices = () => {
    setLoading(true);
    getSpecialNotice(page)
      .then((res) => {
        if (res.status === "success") {
          setSpecialNotices(res.data.photos);
          if (page === 1) {
            assetUrl.current = res.data.asset_url;
            currentEntries.current = res.data.photos.length;
            lastPage.current = res.data.last_page;
          }
        } else {
          //toast
        }
        setLoading(false);
      })
      .catch((err) => {
        axiosErrorHandler(err, notifyError);
        setLoading(false);
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchspecialNotices();
    }
    return () => {
      mounted = false;
    };
  }, [page, refresh]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <ConfirmDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        title={dialogRef.current.title}
        body={dialogRef.current.body}
        onOk={dialogRef.current.onSave}
      />
      <div className={styles.cardContainer}>
        {specialNotices.map((element) => {
          return (
            <EditCard
              key={element.id}
              date={element.expiry_date}
              photo={assetUrl.current + element.photo}
              handleDelete={() => {
                handleDelete(element.id);
              }}
            />
          );
        })}
      </div>
      {specialNotices.length === 0 && <>No data to show</>}
    </div>
  );
};

export default SpecialNoticeList;
