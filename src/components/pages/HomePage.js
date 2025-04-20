"use client";

import React from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div>
      <header className={styles.Header}>
        <h1 className={styles.Heading}>
          나의 링크들을 <span className={styles.accent}>하나로</span>{" "}
          관리하세요.
        </h1>
        <p className={styles.Description}>
          파편화된 모든 정보들을, 이제는 하나의 프로필로 관리해봐요.
        </p>
        <Link href="/login" className={styles.CTA}>
          시작하기
        </Link>
      </header>
      <div className={styles.Hero}>
        <img src="/images/hero-placeholder.png" alt="빈 화면" />
        <img src="/images/hero.png" alt="예시 링크 관리 화면" />
        <img src="/images/hero-placeholder.png" alt="빈 화면" />
      </div>
    </div>
  );
}

export default HomePage;
