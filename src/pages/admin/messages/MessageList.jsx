import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../App";
import MessageCard from "../../../components/Admin/Card/MessageCard";
import MessageModal from "../../../components/Admin/Modal/MessageModal";
import Loading from "../../../components/Loading/Loading";
import Pagination from "../../../components/Pagination/Pagination";
import { getMessages, readMessage } from "../../../utils/api/contactUs";
import { axiosErrorHandler } from "../../../utils/errorHandle/axiosErrorHandler";
import styles from "./MessageList.module.css";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const lastPage = useRef(1);
  const currentEntries = useRef(0);
  const [modalVisible, setModalVisible] = useState(false);
  const showDataRef = useRef(null);
  const fetchMessages = () => {
    setLoading(true);
    getMessages(page)
      .then((res) => {
        if (res.status === "success") {
          setMessages(res.data.connect_with_us);
          if (page === 1) {
            currentEntries.current = res.data.connect_with_us.length;
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
      fetchMessages();
    }
    return () => {
      mounted = false;
    };
  }, [page]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <MessageModal
        visible={modalVisible}
        setVisible={setModalVisible}
        data={messages[showDataRef.current]}
        showColumn={[
          "name",
          "phone_number",
          "address",
          "email",
          "subject",
          "message",
        ]}
      />
      <div className={styles.cardContainer}>
        {messages.map((element, index) => {
          return (
            <MessageCard
              key={element.id}
              data={element}
              showColumn={[
                "name",
                "phone_number",
                "address",
                "email",
                "subject",
              ]}
              onView={() => {
                showDataRef.current = index;
                setModalVisible(true);
                if (element.read_status === 0) {
                  readMessage(element.id)
                    .then(
                      setMessages((prev) => {
                        let d = prev.filter((r) => {
                          if (r.id !== element.id) {
                            return r;
                          } else {
                            r.read_status = 1;
                            return r;
                          }
                        });
                        return prev;
                      })
                    )
                    .catch((err) => {});
                }
              }}
            />
          );
        })}
      </div>
      {messages.length > 0 ? (
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

export default MessageList;
