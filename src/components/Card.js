"use client";

import styles from "./Card.module.css";

function Card({ className = "", children, ...props }) {
  return (
    <div className={`${styles.Card} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
