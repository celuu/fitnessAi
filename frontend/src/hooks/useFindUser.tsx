import { useState } from "react";
import { useNavigate } from "react-router";

export const useFindUser = () => {
  const [foundUser, setFoundUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [findUserError, setFindUserError] = useState(false);
  const navigate = useNavigate();

  const findUser = async (email) => {
    setIsUserLoading(true);

    const res = await fetch('/api/user/finduser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
    const json = await res.json();

    if (res.ok) {
      setFoundUser(true);
      setIsUserLoading(false);
    } else {
      setFoundUser(false);
      setIsUserLoading(false);
      setFindUserError(json.error);
      if (res.status !== 400) navigate("/signup", { state: { email } });
    }
  }
  return { findUser, isUserLoading, foundUser, findUserError };
};