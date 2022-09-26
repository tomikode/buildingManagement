import React from "react";
import { useState } from "react";

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
      {id}
	  <br />
	  {postDate}
	  <br />
	  {user}
      <div>
        <label>Content</label>
        <input
          type="text"
          placeholder="Add post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <input type="submit" value="Post Notice" />
    </form>
  );
};

export default EditNotice;
