import styles from "./TextArea.module.css";

function TextArea({ className = "", value = "", ...rest }) {
  return (
    <textarea
      className={`${styles.TextArea} ${className}`}
      value={value}
      {...rest}
    />
  );
}

export default TextArea;
