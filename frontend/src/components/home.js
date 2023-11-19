import { Box, Button } from "@chakra-ui/react";
import WithSubnavigation from "./NavigationBar";
import { fetchExercises } from "../api/exercises";
import React, { useState, useEffect } from "react";



const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(fetchExercises());
  }, []);

  return (
    <>
      <WithSubnavigation />
      <Button>Click ME</Button>
    </>
  );



}

export default Home;