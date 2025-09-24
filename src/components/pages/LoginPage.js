"use client";

import { use, useState } from "react";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import HorizontalRule from "../HorizontalRule";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: 로그인 처리
    // 1. fetch 를 사용하여 로그인 요청을 보냅니다.
    // 2. 성공 시 Application 에 쿠키 내 토큰 저장 여부를 확인합니다.
    // 3. 로딩 상태를 만들고 로딩중일 때는 로그인 버튼을 비활성화 합니다.
    // 4. 추가로 로딩중일 때는 로그인 버튼텍스트를 "로그인 중..."으로 변경합니다.
    // 5. 에러 상태를 만들고 로그인 요청이 실패 시 에러 메시지를 로그인버튼 바로 위에 표시합니다.

    if (values.email.length === 0 && values.password.length === 0) {
      setError("이메일과 비밀번호를 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://learn.codeit.kr/api/link-service/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }

      // 로그인 성공 후 처리
      alert("로그인이 완료되었습니다.");
      router.push("/me");
    } catch (error) {
      setError(error.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.Heading}>로그인</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        {error ? <div>{error}</div> : <></>}
        <Button disabled={loading} className={styles.Button}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          type="button"
          appearance="outline"
          as="a"
          href="https://learn.codeit.kr/api/link-service/auth/google"
        >
          <img src="/images/google.svg" alt="Google" />
          구글로 시작하기
        </Button>
        <div>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
