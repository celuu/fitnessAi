const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");

const Workout = require("../models/WorkoutSession.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const Exercise = require("../models/Exercise.js");


// const muscleGroups = ["Chest", "Back", "Legs", "Arms", "Shoulders"];
// const randomMuscleGroup =
//   muscleGroups[Math.floor(Math.random() * muscleGroups.length)];
// const fakeExercise = {
//   name: faker.lorem.words(2), // Generates a random two-word name
//   description: faker.lorem.sentence(), // Generates a random sentence
//   muscle_group: randomMuscleGroup, // Random muscle group
// };



// // Create users
// const users = [];
// const NUM_SEED_USERS = 10;

// users.push(
//   new User({
//     username: "demo-user",
//     email: "demo-user@appacademy.io",
//     hashedPassword: bcrypt.hashSync("starwars", 10),
//   })
// );

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   users.push(
//     new User({
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
//     })
//   );
// }

// const seedData = [
//   {
//     user_id: '65482d3417639e438922cd8b',
//     date: new Date("2023-01-15T08:00:00Z"),
//     duration: "60 minutes",
//   },
//   {
//     user_id: users[0]._id, // Replace with another valid user ID
//     date: new Date("2023-01-16T09:30:00Z"),
//     duration: "45 minutes",
//   },
// ];

async function seedWorkouts() {
  try {
    // await Workout.create(seedData);
    await Exercise.create(fakeExercise)
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedWorkouts();