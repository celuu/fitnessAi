import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useFindUser } from "../../hooks/useFindUser";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import WithSubnavigation from "../../components/NavigationBar";

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

  if (user) {
    return <Navigate to='/' replace/>
  }
  
  return (
    <>
      <WithSubnavigation />
      <Heading>Log in</Heading>

      <FormControl isInvalid={error}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <FormErrorMessage>Email is required.</FormErrorMessage>}
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <FormErrorMessage>Password is required.</FormErrorMessage>}

        <Button
          disabled={!!isLoading}
          className="form-button submit signup-submit"
          onClick={handleSubmit}
        >
          {isLoading && <Spinner size="xs" sx={{ mr: "5px" }} />}Continue with
          password
        </Button>
      </FormControl>
    </>
  );
};

export default Login;
