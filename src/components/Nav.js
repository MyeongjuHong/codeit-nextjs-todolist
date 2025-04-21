"use client";

import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import Button from "./Button";

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link href="/">
          <img className={styles.Logo} src="/images/logo.svg" alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  return (
    <header className={styles.Container}>
      <nav className={styles.Nav}>
        <Link href="/">
          <img className={styles.Logo} src="/images/logo.svg" alt="logo" />
        </Link>
        <div className={styles.Menu}>
          <Button as={Link} appearance="secondary" href="/login">
            로그인
          </Button>
          <Button as={Link} appearance="primary" href="/register">
            회원가입
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
