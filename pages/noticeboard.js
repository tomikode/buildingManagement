import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
//import styles from "../styles/Profile.module.css";
import styles from "../styles/UserManagment.module.css";
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const noticesFromMongo = await fetchNotices();
      setNotices(noticesFromMongo);
      const usersFromMongo = await fetchUsers();
      setUsers(usersFromMongo);
    };
    getData();
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/userManagement");
      var loadedNotices = JSON.parse(JSON.stringify(res.data.foundUsers));
      return loadedNotices;
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUser = (who) => {
    return users.find((user) => user._id === who);
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
      <div className={styles.centreWrapper}>
        <div className={styles.loginBox}>
          <div className={styles.titleWithButton}>
            <UserContext.Consumer>
              {(value) => {
                if (value) {
                  user = value.user;
                }
              }}
            </UserContext.Consumer>
            <h2>Noticeboard</h2>
            <Button
              text={
                activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST
                  ? "POST NOTICE"
                  : "CANCEL"
              }
              color={
                activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST
                  ? "lightgreen"
                  : "papayawhip"
              }
              onClick={() => {
                activeViewState !== ACTIVE_VIEW.NOTICEBOARD_LIST
                  ? setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
                  : setActiveViewState(ACTIVE_VIEW.CREATE_NOTICE);
              }}
            />
          </div>
          <br />
          <hr className={styles.hr} />

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
            (notices.length === 0 ? (
              "No notices"
            ) : (
              <NoticeList
                notices={notices}
                onDelete={deleteNotice}
                onEdit={beginEditNotice}
                getUser={getUser}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Noticeboard;
