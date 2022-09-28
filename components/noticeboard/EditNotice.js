import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";

const EditNotice = ({ onEdit, notice = null }) => {
  const [id, setID] = useState("");
  const [user, setUser] = useState("");
  const [postDate, setPostDate] = useState("");
  const [content, setContent] = useState("");
  const [noticeLoaded, setNoticeLoaded] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!content) {
      alert("Please add some content");
      return;
    }

    onEdit({ id, user, postDate, content });

    setID("");
    setUser("");
    setPostDate("");
    setContent("");
  };

  const loadNotice = (notice) => {
    setID(notice._id);
    setUser(notice.user);
    setPostDate(notice.postDate);
    setContent(notice.content);

    setNoticeLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {notice && !noticeLoaded && loadNotice(notice)}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Content</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Add post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <input type="submit" value="POST NOTICE" className={styles.rightButton} />
    </form>
  );
};

export default EditNotice;
