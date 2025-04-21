import styles from "./Avatar.module.css";

function Avatar({ className = "", size = "medium", src, alt, ...props }) {
  console.log("src", src);
  return (
    <img
      className={`${styles.Avatar} ${styles[size]} ${className}`}
      src={src || "/images/default-avatar.svg"}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;
