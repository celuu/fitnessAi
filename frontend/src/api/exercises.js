

export const fetchExercises = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/exercises/");
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Optionally rethrow the error for components to handle
  }
};

