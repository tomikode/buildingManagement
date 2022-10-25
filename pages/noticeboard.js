import { UserContext } from "../utils/UserContext";
import axios from "axios";
import Button from "../components/Button";
import EditNotice from "../components/noticeboard/EditNotice";
import Layout from "../components/Layout";
import NoticeList from "../components/noticeboard/NoticeList";
import React, { createContext, useEffect, useState } from "react";
import styles from "../styles/UserManagment.module.css";

const ANONYMOUS_USER = undefined;
var loggedInUser = ANONYMOUS_USER;

/*
	Noticeboard is the top level component consisting
	of the implementation of the noticeboard feature. It is
	by defaul accessible even by users who are not logged in
*/

const Noticeboard = () => {
  // Enum containing the possible views shown to a user for
  // the implementation of the page.
  const ACTIVE_VIEW = {
    NOTICEBOARD_LIST: 0,
    VIEW_NOTICE: 1,
    EDIT_NOTICE: 2,
    CREATE_NOTICE: 3,
  };

  // Static named constants to make code a bit easir to read
  const NOT_LOGGED_IN = 0;
  const BECAUSE_TRAVERSY_SAID_SO = [];
  const EMPTY = "";
  const NO_SELECTED_NOTICE = 0;

  const [notices, setNotices] = useState([]);
  const [editNoticeSelection, setEditNoticeSelection] =
    useState(NO_SELECTED_NOTICE);
  const [usersTable, setUsersTable] = useState([]);
  const [viewState, setViewState] = useState(ACTIVE_VIEW.NOTICEBOARD_LIST);

  // On load creation execution implement data system
  useEffect(() => {
    const getData = async () => {
      const noticesFromDatabase = await fetchNoticesFromDatabase();
      setNotices(noticesFromDatabase);
      const usersFromMongo = await fetchUsersFromDatabase();
      setUsersTable(usersFromMongo);
    };
    getData();
  }, BECAUSE_TRAVERSY_SAID_SO); // eslint-disable-line

  // Load the data from the live MongoDB database
  const fetchNoticesFromDatabase = async () => {
    try {
      const fetchResult = await axios.get("/api/noticeboard");
      var loadedNotices = fetchResult.data.foundNotices;
      return loadedNotices;
    } catch (e) {
      console.log(e.message);
    }
  };

  // Load users from MongoDB database to attach user-name to posts
  const fetchUsersFromDatabase = async () => {
    try {
      const fetchResult = await axios.get("/api/userManagement");
      var loadedNotices = fetchResult.data.foundUsers;
      return loadedNotices;
    } catch (e) {
      console.log(e.message);
    }
  };

  // Get notice by specified MongoDB _id
  const getNotice = (id) => {
    return notices.find((notice) => notice._id === id);
  };

  // Get user by specified MongoDB _id
  const getUser = (who) => {
    return usersTable.find((user) => user._id === who);
  };

  // Add a new notice to the system, or edit an existing notice
  const postNotice = async (newNotice) => {
    if (newNotice.postDate === EMPTY) {
      newNotice.postDate = `${new Date()}`;
      newNotice.user = loggedInUser;
    }
    const noticeData = {
      ...newNotice,
      _id: editNoticeSelection,
    };
    try {
      const res = await axios.post("/api/noticeboard", noticeData);
      setNotices(await fetchNoticesFromDatabase());
    } catch (e) {
      console.log(e);
    }
    // Once posted, clear the notice and reset to normal noticeboard view
    setEditNoticeSelection(NO_SELECTED_NOTICE);
    setViewState(ACTIVE_VIEW.NOTICEBOARD_LIST);
  };

  // Custom code in addition to normal save that makes
  // different between save and update
  const editSelectedNotice = (notice) => {
    setEditNoticeSelection(notice);
    setViewState(ACTIVE_VIEW.EDIT_NOTICE);
  };

  // Delete notice by provided MongoDB notice._id
  const deleteNotice = async (id) => {
    if (confirm("Remove notice from the board?")) {
      const noticeData = { _id: id };
      try {
        const res = await axios.patch("/api/noticeboard/", noticeData);
        setNotices(await fetchNoticesFromDatabase());
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Layout pageType="all">
      <div className={styles.centreWrapper}>
        <div className={styles.contentBox}>
          <div className={styles.titleWithButton}>
            <h2>Noticeboard</h2>
            <UserContext.Consumer>
              {(value) => {
                try {
                  loggedInUser = value.user;
                } catch {}
              }}
            </UserContext.Consumer>
            {loggedInUser && (
              <Button
                text={
                  viewState === ACTIVE_VIEW.NOTICEBOARD_LIST
                    ? "POST NOTICE"
                    : "CANCEL"
                }
                color={
                  viewState === ACTIVE_VIEW.NOTICEBOARD_LIST
                    ? "lightgreen"
                    : "papayawhip"
                }
                onClick={() => {
                  viewState !== ACTIVE_VIEW.NOTICEBOARD_LIST
                    ? setViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
                    : setViewState(ACTIVE_VIEW.CREATE_NOTICE);
                }}
              />
            )}
          </div>
          <br />
          <hr className={styles.hr} />

          {viewState === ACTIVE_VIEW.CREATE_NOTICE && (
            <EditNotice onEdit={postNotice} />
          )}
          {viewState === ACTIVE_VIEW.EDIT_NOTICE && (
            <EditNotice
              onEdit={postNotice}
              notice={getNotice(editNoticeSelection)}
            />
          )}

          {/* Display message if no notices to show */}
          {viewState === ACTIVE_VIEW.NOTICEBOARD_LIST &&
            (notices.length === 0 ? (
              "No notices"
            ) : (
              <NoticeList
                notices={notices}
                onDelete={deleteNotice}
                onEdit={editSelectedNotice}
                getUser={getUser}
                loggedInUser={loggedInUser}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Noticeboard;
