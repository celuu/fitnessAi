import { Box, Text } from "@chakra-ui/react";
import WithSubnavigation from "./NavigationBar";
import { fetchExercises } from "../api/exercises";
import React, { useState, useEffect } from "react";



const Home = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/exercises/");
        const result = response.json();
        return result;
      } catch (error) {
        console.error("API call error:", error);
        throw error; // Optionally rethrow the error for components to handle
      }
    };
    setData(fetchExercises());
  }, []);


  return (
    <>
      <WithSubnavigation />
      <Box>

      </Box>
    </>
  );



}

export default Home;