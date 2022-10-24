import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import formStyles from '../../styles/Form.module.css'

const EditMail = ({ onEdit, mail = null }) => {
  const [id, setID] = useState("");
  const [user, setUser] = useState("");
  const [postDate, setPostDate] = useState("");
  const [content, setContent] = useState("");
  const [mailLoaded, setMailLoaded] = useState(false);

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

  const loadMail = (mail) => {
    setID(mail._id);
    setUser(mail.user);
    setPostDate(mail.postDate);
    setContent(mail.content);

    setMailLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {mail && !mailLoaded && loadMail(mail)}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
        <tr>
            <td style={{ textAlign: "right" }}>
              <label>TO</label>
            </td>
            <td>
              <input
                type="email"
                className={formStyles.b} 
                placeholder="Receiver email address"
              />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Subject</label>
            </td>
            <td>
              <input
                type="text"
                className={formStyles.b} 
                placeholder="Add Massage subject"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Massage Description</label>
            </td>
            <td>
              <input
                type="text"
                className={formStyles.a} 
                placeholder="Add your massage"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <input type="submit" value="Send" className={styles.rightButton} />
    </form>
  );
};

export default EditMail;
