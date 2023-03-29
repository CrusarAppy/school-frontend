import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import EditCard from "../../../components/Admin/Card/EditCard";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import { deleteDownloads, getDownloads } from "../../../utils/api/downloads";
import { getDateFromTimestamp } from "../../../utils/dateTime/date";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./DownloadsList.module.css";

const DownloadsList = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const assetUrl = useRef(null);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/downloads/${id}/`);
  };

  const handleDelete = (id) => {
    dialogRef.current = {
      title: "Are you sure?",
      body: "This will delete the file.",
      onSave: () => {
        setLoading(true);
        deleteDownloads(id)
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
  const fetchdownloads = () => {
    setLoading(true);
    getDownloads(page, "english")
      .then((res) => {
        if (res.status === "success") {
          setDownloads(res.data.downloads);
          if (page === 1) {
            currentEntries.current = res.data.downloads.length;
            lastPage.current = res.data.last_page;
            assetUrl.current = res.data.asset_url;
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
      fetchdownloads();
    }
    return () => {
      mounted = false;
    };
  }, [page, refresh]);

  const youtubeImage = (videolink) => {
    const videoid = videolink.split("=")[1].split('"')[0].split("&")[0];
    return `http://img.youtube.com/vi/${videoid}/0.jpg`;
  };
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
        {downloads.map((element) => {
          return (
            <EditCard
              key={element.id}
              title={element.title}
              date={getDateFromTimestamp(element.created_at)}
              photo={"/img/file-icon.png"}
              handleEdit={() => {
                handleEdit(element.id);
              }}
              handleDelete={() => {
                handleDelete(element.id);
              }}
              handleView={() => {
                window.open(assetUrl.current + element.file);
              }}
            />
          );
        })}
      </div>
      {downloads.length > 0 ? (
        <div>
          <Pagination
            page={page}
            setPage={setPage}
            lastPage={lastPage.current}
          />
        </div>
      ) : (
        <>No data to show</>
      )}
    </div>
  );
};

export default DownloadsList;
