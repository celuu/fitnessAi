import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useFindUser } from "../../hooks/useFindUser";
import { Spinner } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { findUser, isUserLoading, foundUser, findUserError } = useFindUser();
  const {user} = useAuthContext();

  const handleFindUser = async (e) => {
    e.preventDefault();
    await findUser(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (foundUser) handleSubmit(e);
    else handleFindUser(e);
  };

  // if (user) {
  //   return <Navigate to='/' replace/>
  // }
  
  return (
    <div className="session-page">
      <div className="session-form-container">
        <h1>Log in</h1>
        <form className="session-form" onSubmit={handleFormSubmit}>
          <div className="separator-container">
            <div role="separator" className="separator"></div>
          </div>
          <label htmlFor="email">Email</label>
          <input
            type="search"
            id="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {foundUser && (
            <>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password..."
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          {!foundUser ? (
            <button
              className="form-button continue"
              disabled={!!isUserLoading}
              onClick={handleFindUser}
            >
              {isUserLoading && <Spinner size="xs" sx={{ mr: "5px" }} />}
              Continue with email
            </button>
          ) : (
            <button
              className="form-button submit"
              disabled={!!isLoading}
              onClick={handleSubmit}
            >
              {isLoading && <Spinner size="xs" sx={{ mr: "5px" }} />}Continue
              with password
            </button>
          )}
          {(error || findUserError) && (
            <div className="error">{error || findUserError}</div>
          )}
        </form>

      </div>
    </div>
  );
};

export default Login;
