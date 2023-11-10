
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/Login/Login";
import Signup from "./features/Signup/Signup";
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box bg={'black'}>
      <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
