import React, { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Spinner } from "@chakra-ui/spinner";
import { Flex, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router";
import WithSubnavigation from "../../components/NavigationBar";

const Signup = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  // useEffect(() => {
  //   if (location.state.email) setEmail(location.state.email);
  // }, [location.state.email]);

  return (
    <>
      <WithSubnavigation />
      <Flex direction={"column"}>
        <Heading>Sign up</Heading>
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
        
      </Flex>
    </>
  );
};

export default Signup;
