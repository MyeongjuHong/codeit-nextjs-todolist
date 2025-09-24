const API_URL = "https://learn.codeit.kr";

export const createUser = async ({
  email: userEmail,
  name: userName,
  password: userPwd,
}) => {
  const res = await fetch(`${API_URL}/api/link-service/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      name: userName,
      password: userPwd,
    }),
  });

  if (!res.ok) {
    throw new Error("유저 생성 실패");
  }

  const data = await res.json();
};
