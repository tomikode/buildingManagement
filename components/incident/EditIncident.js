import React from "react";
import { useState } from "react";
import styles from "../../styles/UserManagment.module.css";
import formStyles from '../../styles/Form.module.css'

const EditIncident = ({ onEdit, incident = null }) => {
  const [id, setID] = useState("");
  const [user, setUser] = useState("");
  const [postDate, setPostDate] = useState("");
  const [content, setContent] = useState("");
  const [incidentLoaded, setIncidentLoaded] = useState(false);

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

  const loadIncident = (incident) => {
    setID(incident._id);
    setUser(incident.user);
    setPostDate(incident.postDate);
    setContent(incident.content);

    setIncidentLoaded(true);
  };

  return (
    <form onSubmit={onSubmit}>
      {incident && !incidentLoaded && loadIncident(incident)}
      <table style={{ borderSpacing: "10px 15px" }}>
        <tbody>
        <tr>
            <td style={{ textAlign: "right" }}>
              <label>Submitted by</label>
            </td>
            <td>
              <input
                type="text"
                className={formStyles.b} 
                placeholder="Add your name"
              />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "right" }}>
              <label>Incident Description</label>
            </td>
            <td>
              <input
                type="text"
                className={formStyles.a} 
                placeholder="Add Incident Description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <input type="submit" value="Add Incident" className={styles.rightButton} />
    </form>
  );
};

export default EditIncident;
