"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./MyPage.module.css";
import { userService } from "@/lib/userService";
import { useAuth } from "@/providers/AuthProvider";
import Avatar from "@/components/Avatar";

function MyPage() {
  // const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  console.log("user", user);
  // async function getMe() {
  //   try {
  //     const userData = await getUser();
  //     setUser(userData);
  //   } catch (error) {
  //     console.error("사용자 정보 가져오기 실패:", error);
  //     alert("로그인이 필요합니다.");
  //     router.push("/login");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function getMyLinks() {
    try {
      const linksData = await userService.getMyLinks();
      setLinks(linksData);
    } catch (error) {
      console.error("링크 정보 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyLinks();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          <Avatar size="large" src={user.avatar} alt="사용자 아바타" />
          <div className={styles.profileInfo}>
            <h1>{user.name}</h1>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
        </div>
      </div>

      <div className={styles.links}>
        <h2>내 링크</h2>
        {links.length === 0 ? (
          <p>저장된 링크가 없습니다.</p>
        ) : (
          <ul className={styles.linkList}>
            {links.map((link) => (
              <li key={link.id} className={styles.linkItem}>
                <h3>{link.title}</h3>
                <p>{link.url}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPage;
