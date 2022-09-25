import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Profile.module.css";
import NoticeList from "../components/noticeboard/NoticeList"
import Button from "../components/Button"
//import beginEditNotice from "../components/notice_management/beginEditNotice";

const Noticeboard = () => {

    // Constants
    const NO_SELECTED_NOTICE = 0
    const ACTIVE_VIEW = {
        NOTICEBOARD_LIST: 0,
        VIEW_NOTICE: 1,
        EDIT_NOTICE: 2,
        CREATE_NOTICE: 3,
    }

    // State
    const [activeViewState, setActiveViewState] = useState(ACTIVE_VIEW.NOTICEBOARD_LIST)
    const [selectedNoticeID, setSelectedNoticeID] = useState(NO_SELECTED_NOTICE)
    const [notices, setNotices] = useState([
        {
            id: 1,
            userID: 1,
            postedAt: "Five O'clock!",
            content: "One two three O'clock, four O'clock rock!",
        },
        {
            id: 2,
            userID: 1,
            postedAt: "EOD",
            content: "Chaos is in the hearts and minds of all children, until the machine grows and chaos dies.",
        },
        {
            id: 3,
            userID: 2,
            postedAt: "Now",
            content: "I have to stop hitting Ctrl-Shft-S.",
        },
    ])

    // Methods, are they even methods?
    const getNotice = (id) => {
        console.log(`Getting notice ${id}`)
        return notices.find((notice) => notice.id === id)
    }

    const postNotice = (notice) => {
        if (getNotice(notice.id) !== undefined) {
            setNotices(notices.map((notices) => notice.id === notice.id
                ? notice
                : notice))
            alert(`Notice ${notice.id} updated`)
            setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
        }
        else {
            setNotices([...notices, notice])
            alert(`New notice ${notice.id} posted`)
            setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
        }
    }

    const beginEditNotice = (notice) => {
        setSelectedNoticeID(notice)
        setActiveViewState(ACTIVE_VIEW.EDIT_NOTICE)
    }

    const deleteNotice = (id) => {
        // Log a message about notice deletion
        notices.map((notice) => notice.id === id
            ? console.log(`Deleting ${notice.id}`)
            : null)

        // Delete the notice by given notice ID
        setNotices(notices.filter((notice) => notice.id !== id))
    }

    return (
        <Layout pageType="m">
            <div className={styles.maxWidth}>

                <h2>
                    Noticeboard
                    {<Button
                        text={activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST ? "Add notice" : "Cancel"}
                        onClick={() => {
                            activeViewState !== ACTIVE_VIEW.NOTICEBOARD_LIST
                                ? setActiveViewState(ACTIVE_VIEW.NOTICEBOARD_LIST)
                                : setActiveViewState(ACTIVE_VIEW.VIEW_NOTICE)
                        }}
                    />}
                </h2>

                {activeViewState === ACTIVE_VIEW.CREATE_NOTICE && <beginEditNotice onEdit={addnotice} />}
                {activeViewState === ACTIVE_VIEW.EDIT_NOTICE && <beginEditNotice onEdit={addnotice}
                    notice={getNotice(selectedNoticeID)} />}

                {/* Display message if no notices to show */}
                {activeViewState === ACTIVE_VIEW.NOTICEBOARD_LIST &&
                    (notices.length > 0)
                    ? (<noticeList
                        notices={notices}
                        onDelete={deleteNotice}
                        onEdit={beginEditNotice} />)
                    : "No notices"}
            </div>
        </Layout>
    );
};

export default Noticeboard;
