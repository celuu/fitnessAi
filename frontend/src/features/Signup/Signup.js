import React, { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import "../Login/Login.css";
import { Spinner } from "@chakra-ui/spinner";
import { useLocation } from "react-router";

const Signup = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  useEffect(() => {
    if (location.state.email) setEmail(location.state.email);
  }, [location.state.email]);

  return (
    <div className="session-page">
      <div className="session-form-container">
        <h1>Sign up</h1>
        <form className="session-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="search"
            id="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={!!isLoading}
            className="form-button submit signup-submit"
          >
            {isLoading && <Spinner size="xs" sx={{ mr: "5px" }} />}Continue with
            password
          </button>
          {error && <div className="error">{error}</div>}
          <div className="separator-container">
            <div role="separator" className="separator"></div>
          </div>
        </form>
        <div className="disclaimer-text">
          <p>
            By clicking “Continue with Email” above, you
            acknowledge that you have read and understood, and agree to
            Scribble's{" "}
            <a
              className="scribble-link"
              href="https://www.notion.so/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac#33378f25e4084c96bb32bbae0cd074c5"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              className="scribble-link"
              href="https://www.notion.so/Privacy-Policy-3468d120cf614d4c9014c09f6adc9091"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
