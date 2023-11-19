import React, { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Spinner } from "@chakra-ui/spinner";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router";
import WithSubnavigation from "../../components/NavigationBar";

const Signup = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const isError = email === error;

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
        <FormControl isInvalid={isError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}

          <Button
            disabled={!!isLoading}
            className="form-button submit signup-submit"
            onClick={handleSubmit}
          >
            {isLoading && <Spinner size="xs" sx={{ mr: "5px" }} />}Continue with
            password
          </Button>
        </FormControl>
      </Flex>
    </>
  );
};

export default Signup;
