import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(undefined);

    const res = await fetch('/api/user/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // saving the user to the browser's local storage
      localStorage.setItem("user", JSON.stringify(json));

      // updating the AuthContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  }
  return { login, isLoading, error };
};