import PropTypes from "prop-types";
import styles from "../styles/UserManagment.module.css";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      className={styles.rightButton}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "pink",
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
