
import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/Login/Login";
import Signup from "./features/Signup/Signup";
import { Box } from '@chakra-ui/react';
import Home from './components/home';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
