"use client";

import styles from "./LinkCard.module.css";
import Button from "./Button";

function LinkCard({ title, url, thumbUrl, onClick, onDelete }) {
  function handleClick(e) {
    e.preventDefault();
    onClick?.();
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    onDelete?.();
  }

  return (
    <a
      className={styles.LinkCard}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClick}
    >
      {thumbUrl ? (
        <div
          className={styles.Thumb}
          style={{ backgroundImage: `url(${thumbUrl})` }}
        />
      ) : (
        <div className={styles.EmptyThumb}>이미지 없음</div>
      )}
      <div className={styles.Info}>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Url}>{url}</div>
      </div>
      {onDelete && (
        <Button
          className={styles.DeleteButton}
          onClick={handleDeleteClick}
          type="button"
        >
          삭제
        </Button>
      )}
    </a>
  );
}

export default LinkCard;
