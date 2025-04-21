"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import AvatarInput from "@/components/AvatarInput";
import styles from "./page.module.css";
import { useAuth } from "@/providers/AuthProvider";

export default function EditPage() {
  const [values, setValues] = useState({
    avatar: "",
    name: "",
    email: "",
    bio: "",
  });
  const { updateUser, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const { avatar, name, email, bio } = user;
      setValues({
        avatar: avatar || "",
        name: name || "",
        email: email || "",
        bio: bio || "",
      });
    }
  }, [user]);

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", values.avatar);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("bio", values.bio);

      await updateUser(formData);

      router.push("/me");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <>
      <h1 className={styles.Heading}>프로필 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <AvatarInput
          name="avatar"
          initialAvatar={values.avatar}
          className={styles.Input}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="이름"
          value={values.name}
          onChange={handleInputChange}
        />
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
          onChange={handleInputChange}
        />
        <Label className={styles.Label} htmlFor="bio">
          내 링크 소개
        </Label>
        <TextArea
          id="bio"
          className={styles.TextArea}
          name="bio"
          type="text"
          maxLength={64}
          placeholder="아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"
          value={values.bio}
          onChange={handleInputChange}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}
