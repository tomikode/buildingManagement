import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Profile.module.css";
import NoticeList from "../components/noticeboard/NoticeList";
import Button from "../components/Button";
import EditNotice from "../components/noticeboard/EditNotice";
import axios from "axios";
import { UserContext } from "./_app";

const Noticeboard = () => {
  const NoticeContext = createContext();

  // Constants
  const NO_SELECTED_NOTICE = 0;
  const ACTIVE_VIEW = {
    NOTICEBOARD_LIST: 0,
    VIEW_NOTICE: 1,
    EDIT_NOTICE: 2,
    CREATE_NOTICE: 3,
  };
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    console.log("Loading notices");
    const getNotices = async () => {
      const noticesFromMongo = await fetchNotices();
      setNotices(noticesFromMongo);
    };
    getNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("/api/noticeboard");
      var loadedNotices = JSON.parse(JSON.stringify(res.data.foundNotices));
      return loadedNotices;
    } catch (e) {
      console.log(e.message);
    }
  };

  // State
  const [activeViewState, setActiveViewState] = useState(
    ACTIVE_VIEW.NOTICEBOARD_LIST
  );
  const [selectedNoticeID, setSelectedNoticeID] = useState(NO_SELECTED_NOTICE);
  var user = undefined;

  // Methods, are they even methods?
  const getNotice = (id) => {
    return notices.find((notice) => notice._id === id);
  };

  const postNotice = async (newNotice) => {
    if (!newNotice.postDate) {
      newNotice.postDate = "" + new Date();
      newNotice.user = user;
    }
    const noticeData = {
      _id: selectedNoticeID,
      user: newNotice.user,
      postDate: newNotice.postDate,
      content: newNotice.content,
    };
    console.log("New notice data:", noticeData);
    const res = await axios.post("/api/noticeboard", noticeData);
    setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST);
    setNotices(await fetchNotices());
    setSelectedNoticeID(NO_SELECTED_NOTICE);
  };

  const beginEditNotice = (notice) => {
    setActiveViewState(ACTIVE_VIEW.EDIT_NOTICE);
    setSelectedNoticeID(notice);
  };

  const deleteNotice = async (id) => {
    const noticeData = {
      _id: id,
    };
    const res = await axios.patch("/api/noticeboard/", noticeData);
    setNotices(await fetchNotices());
  };

  return (
    <Layout pageType="all">
      <UserContext.Consumer>
        {(value) => {
          user = value.user;
        }}
      </UserContext.Consumer>
      <div className={styles.maxWidth}>
        <h2>
          Noticeboard
          {
            <Button
              text={
                activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST
                  ? "Add notice"
                  : "Cancel"
              }
              onClick={() => {
                activeViewState !== ACTIVE_VIEW.NOTICEBOARD_LIST
                  ? setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
                  : setActiveViewState(ACTIVE_VIEW.CREATE_NOTICE);
              }}
            />
          }
        </h2>

        {activeViewState === ACTIVE_VIEW.CREATE_NOTICE && (
          <EditNotice onEdit={postNotice} />
        )}
        {activeViewState === ACTIVE_VIEW.EDIT_NOTICE && (
          <EditNotice
            onEdit={postNotice}
            notice={getNotice(selectedNoticeID)}
          />
        )}

        {/* Display message if no notices to show */}
        {activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST &&
        notices.length > 0 ? (
          <NoticeList
            notices={notices}
            onDelete={deleteNotice}
            onEdit={beginEditNotice}
          />
        ) : (
          "No notices"
        )}
      </div>
    </Layout>
  );
};

export default Noticeboard;
