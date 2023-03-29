import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import EditCard from "../../../components/Admin/Card/EditCard";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import { deleteBlog, getBlogs } from "../../../utils/api/blogs";
import { getDateFromTimestamp } from "../../../utils/dateTime/date";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./BlogList.module.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const assetUrl = useRef(null);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const navigate = useNavigate();
  const dialogRef = useRef({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (id) => {
    navigate(`/admin/blogs/${id}`);
  };

  const handleDelete = (id) => {
    dialogRef.current = {
      title: "Are you sure?",
      body: "This will delete the blog.",
      onSave: () => {
        setLoading(true);
        deleteBlog(id)
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

  const fetchBlogs = () => {
    setLoading(true);
    getBlogs(page, "english")
      .then((res) => {
        if (res.status === "success") {
          setBlogs(res.data.blogs);
          if (page === 1) {
            assetUrl.current = res.data.asset_url;
            currentEntries.current = res.data.blogs.length;
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
      fetchBlogs();
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
        {blogs.map((element) => {
          return (
            <EditCard
              key={element.id}
              title={element.title}
              date={getDateFromTimestamp(element.created_at)}
              photo={assetUrl.current + element.image}
              handleEdit={() => {
                handleEdit(element.id);
              }}
              handleDelete={() => {
                handleDelete(element.id);
              }}
            />
          );
        })}
      </div>
      {blogs.length > 0 ? (
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

export default BlogList;
