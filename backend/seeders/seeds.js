const mongoose = require("mongoose");
require("dotenv").config();
const { mongoURI: db } = require("../config/keys.js");
const Exercise = require("../models/Exercise.js");

const seedExercises = [
  {
    name: "Assisted Pull Up",
    description:
      "Unlike most other movements, the higher the weight you select for this movement, the easier it is to do. Some gyms have bars instead of pads. If your gym has a bar, place your feet on it instead.",
    muscle_group: "Back",
  }
  ,
  {
    name: "Assisted Dip",
    description:
      "Unlike most other movements, the higher the weight you select for this movement, the easier it is to do. Some gyms have bars instead of pads. If your gym has a bar, place your feet on it instead.",
    muscle_group: "Triceps",
  },
  {
    name: "Stability Ball Sit Up",
    description:
      "Try to avoid pulling on your head with your hands because it can lead to neck discomfort later on.",
    muscle_group: "Abs",
  },
  {
    name: "Decline Barbell Bench Press",
    description:
      "By having a spotter help you unrack the barbell at the start of the lift, you will have an easier time during the rest of the lift. Just make sure you don't let them touch the barbell once you start benching unless you need help racking the bar. ",
    muscle_group: "Chest",
  },
  {
    name: "Barbell Drag Curl",
    description:
      "You can also perform this movement using an EZ curl bar if you find your wrists are uncomfortable during it. ",
    muscle_group: "Biceps",
  },
  {
    name: "Front Squat",
    description:
      "If using a heavy weight with this movement, protect your wrists by resting the barbell on your front shoulders and driving your elbows upwards to allow your hands to hold it there.",
    muscle_group: "Legs",
  },
  {
    name: "Barbell Front Raise",
    description:
      "Make sure you do not raise the barbell above the level of your shoulder.",
    muscle_group: "Shoulders",
  },
  {
    name: "Front Squat With Crossed Arms",
    description:
      "Focus on keeping your elbows up and torso upright more than anything else. Doing so can prevent the barbell from falling forward.",
    muscle_group: "Legs",
  },
  {
    name: "Incline Barbell Row",
    description:
      "If your bench has too high of an incline, you may not be able to pick up the barbell to start the movement. Aim for an incline around 45º. Ask a friend for help handing it off for you if needed. ",
    muscle_group: "Back",
  },
  {
    name: "Barbell Forward Lunge",
    description: "Try not to take too small of a step.",
    muscle_group: "Legs",
  },
  {
    name: "Close Grip Barbell Bench Press",
    description:
      "If you want to increase the emphasis on your triceps, try tucking your elbows into your sides throughout the entire movement.",
    muscle_group: "Triceps",
  },
  {
    name: "Barbell Preacher Curl",
    description:
      "If your wrists feel uncomfortable, you can substitute a regular barbell for the EZ curl bar.",
    muscle_group: "Biceps",
  },
  {
    name: "Prone Incline Barbell Curl",
    description:
      "You may need to ask a friend for assistance handing the barbell to you for you to begin the movement. This movement may not work on all decline benches. If yours does not allow you to perform the movement, try switching to an incline (adjustable) bench instead.",
    muscle_group: "Biceps",
  },
  {
    name: "Barbell Reverse Wrist Curl",
    description:
      "This movement will benefit from you performing it slowly, try to drag out the length of each rep by lowering the barbell back down slowly each time.",
    muscle_group: "Forearm",
  },
  {
    name: "Barbell Reverse Curl",
    description:
      "Keep your wrists up for the best effect, don't let them drop.",
    muscle_group: "Forearm",
  },
  {
    name: "Seated Good Morning",
    description:
      "If you can, try to have a spotter assist you during this movement.",
    muscle_group: "Back",
  },
  {
    name: "Stability Ball Barbell Twist",
    description:
      "Be extremely careful with this exercise, do not use a heavy weight if you can. Focus on staying balanced. Use a spotter. If possible, use a PVC pipe instead of a barbell for this exercise.",
    muscle_group: "Abs",
  },
  {
    name: "Wide Grip Barbell Curl",
    description: "Try to avoid using your legs or back to lift the barbell.",
    muscle_group: "Biceps",
  },
  {
    name: "Stiff Legged Barbell Deadlift",
    description:
      "Only perform this movement if you have excellent flexibility. If you cannot lift with mostly straight legs and a flat back, try a different type of deadlift.",
    muscle_group: "Legs",
  },
  {
    name: "Barbell Sumo Deadlift",
    description: "Grip the barbell very tightly. ",
    muscle_group: "Back",
  },
  {
    name: "EZ Bar Upright Row",
    description:
      "This movement can also be performed with a regular barbell if an EZ bar is not available.",
    muscle_group: "Back",
  },
  {
    name: "Wide Grip Barbell Bench Press",
    description:
      "If you experience shoulder discomfort, bring your hands slightly closer together and tuck your elbows in slightly throughout the movement.",
    muscle_group: "Chest",
  },
  {
    name: "Wide Grip Barbell Upright Row",
    description: "Lower the barbell slowly on the way down for added benefit.",
    muscle_group: "Shoulders",
  },
  {
    name: "Battle Ropes",
    description:
      "To decrease the difficulty, shorten the ropes by wrapping them around the pole multiple times.",
    muscle_group: "Biceps",
  },
  {
    name: "Cable Crossover Row",
    description:
      "If the handles you use are uncomfortable, try switching them out for similar ones with a different grip.",
    muscle_group: "Back",
  },
  {
    name: "Cable Crossover Reverse Fly",
    description:
      "If the handles you use are uncomfortable, try switching them out for similar ones with a different grip.",
    muscle_group: "Back",
  },
  {
    name: "Cable Curl With Lat Bar",
    description:
      "Focus on squeezing the biceps consciously throughout the entire movement for the greatest effect.",
    muscle_group: "Biceps",
  },
  {
    name: "Cable Deadlift",
    description:
      "This movement cannot be performed on machines where the cables are far apart.",
    muscle_group: "Legs",
  },
  {
    name: "One Arm Cable Front Raise",
    description:
      "Try to hold your arm in place at the top for 1 second each rep for added benefit.",
    muscle_group: "Shoulders",
  },
  {
    name: "Cable Front Raise",
    description:
      "Make sure you do not raise the bar above the level of your shoulder.",
    muscle_group: "Shoulders",
  },
  {
    name: "Cable Rope Curl",
    description:
      "Focus on squeezing the biceps consciously throughout the entire movement for the greatest effect.",
    muscle_group: "Forearm",
  },
  {
    name: "Cable Hip Adduction",
    description:
      "If you don't have the attachment shown in the video, you can always improvise with a regular pulley handle, but it is not ideal.",
    muscle_group: "Legs",
  },
  {
    name: "Kneeling Cable Crunch",
    description:
      "If your knees hurt, try using a mat or other soft object like a towel to cushion them.",
    muscle_group: "Abs",
  },
  {
    name: "Kneeling Cable Tricep Extension",
    description:
      "If your knees hurt, try using a mat or other soft object like a towel to cushion them.",
    muscle_group: "Triceps",
  },
  {
    name: "Cable Lateral Raise",
    description:
      "For greater benefit, try holding the cables for 1 second before lowering them when your arms are parallel to the ground.",
    muscle_group: "Shoulders",
  },
  {
    name: "Cable Row With Lat Bar",
    description: "Try to avoid moving your head while pulling.",
    muscle_group: "Back",
  },
  {
    name: "Cable Lying Chest Fly",
    description:
      "Consciously focus on squeezing your chest at the point where your hands are about to meet for added benefit.",
    muscle_group: "Chest",
  },
  {
    name: "One Arm Cable Curl",
    description:
      "If the handle you select is uncomfortable to grip, you can always substitute it for a more comfortable one.",
    muscle_group: "Biceps",
  },
  {
    name: "One Arm Cable Chest Fly",
    description:
      "To increase lat involvement, set the handle up at a higher position.",
    muscle_group: "Chest",
  },
  {
    name: "One Arm Cable Lateral Raise",
    description:
      "Try to hold your arm in place at the top for 1 second each rep for added benefit.",
    muscle_group: "Shoulders",
  },
  {
    name: "Overhead Rope Tricep Extension",
    description:
      "The higher your elbows are pointed when you start, the more you'll train the long rear head of your triceps.",
    muscle_group: "Triceps",
  },
  {
    name: "Rope Face Pull",
    description:
      "If you have the flexibility to do so, you can bring the rope back even further until the point that your upper arms pass behind your torso.",
    muscle_group: "Back",
  },
  {
    name: "Cable Seated Crunch",
    description:
      "You can optionally sit in the middle of the bench instead of the end if it is more comfortable for you.",
    muscle_group: "Abs",
  },
  {
    name: "V-Bar Lat Pulldown",
    description:
      "If the pads do not firmly secure your thigh, they can be adjusted.",
    muscle_group: "Back",
  },
  {
    name: "One Arm Cable Seated Row",
    description:
      "Keep your torso straight and prevent it from twisting by consciously tightening your abs.",
    muscle_group: "Back",
  },
  {
    name: "Cable Seated Rear Lateral Raise",
    description:
      "Try to not bend forward too far, you want to be at about 45 degrees during this movement.",
    muscle_group: "Shoulders",
  },
  {
    name: "Cable Shoulder Press",
    description:
      "If you feel discomfort in your lower back during this movement, you may be leaning too far backward. Try to maintain an upright torso throughout the entire movement. If you struggle with this, squeezing your glutes and abs can help.",
    muscle_group: "Shoulders",
  },
  {
    name: "Cable Shrug",
    description:
      "This movement will benefit from you performing it slowly, try to drag out the length of each rep by lowering the barbell back down slowly each time.",
    muscle_group: "Back",
  },
  {
    name: "Cable Side Bend",
    description:
      "Do your best to prevent yourself from leaning forward or back, do not twist your torso at all. Just lower yourself down to the side.",
    muscle_group: "Abs",
  },
  {
    name: "High Cable Chest Fly",
    description:
      "Squeeze your chest while driving your arms forward and down for added benefit.",
    muscle_group: "Chest",
  },
  {
    name: "Cable Twist",
    description:
      "The lower the cable attachment you use, the harder this exercise will be.",
    muscle_group: "Abs",
  },
  {
    name: "One Arm Cable Underhand Tricep Extension",
    description:
      "Try to consciously focus on squeezing your triceps while you press down for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Cable Upright Row",
    description:
      "If a certain bar or handle feels uncomfortable for you, you can always switch it out for another one.",
    muscle_group: "Back",
  },
  {
    name: "Close Grip Push Up",
    description:
      "Focus on squeezing your triceps as you push up for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Cocoon",
    description:
      "Try not to strain your neck too much while crunching forward.",
    muscle_group: "Abs",
  },
  {
    name: "Straight Arm Bent Knee Crunch",
    description:
      "If you want to make this movement easier, keep your hands angled diagonally up and back so that they are not directly overhead.",
    muscle_group: "Abs",
  },
  {
    name: "Diamond Push Up",
    description:
      "Focus on squeezing your triceps as you push up for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Dumbbell Seesaw Press",
    description:
      "If you experience neck discomfort this movement can be performed without moving your head and only leaning your torso slightly to the side.",
    muscle_group: "Shoulders",
  },
  {
    name: "Dumbbell Concentration Curl",
    description:
      "Consciously squeeze your bicep while curling the dumbbell up for added benefit.",
    muscle_group: "Biceps",
  },
  {
    name: "Decline Dumbbell Bench Press",
    description:
      "You can adjust the angle of the bench to change the difficulty of this movement.",
    muscle_group: "Chest",
  },
  {
    name: "Decline Dumbbell Chest Fly",
    description:
      "For added benefit, squeeze your chest tightly while bringing the dumbbells together.",
    muscle_group: "Chest",
  },
  {
    name: "Incline Dumbbell Curl",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train the long head of your biceps.",
    muscle_group: "Biceps",
  },
  {
    name: "Incline Hammer Curl",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train the long head of your biceps.",
    muscle_group: "Biceps",
  },
  {
    name: "Dumbbell Iron Cross",
    description:
      "Do not allow the dumbbells to drop below your shoulder level.",
    muscle_group: "Shoulders",
  },
  {
    name: "One Arm Lying Dumbbell Tricep Extension",
    description:
      "Make sure you keep your upper arm directly above your shoulder at all times.",
    muscle_group: "Triceps",
  },
  {
    name: "Lying Dumbbell Tricep Extension",
    description:
      "Make sure you always keep the dumbbells to the side of your head and don't accidentally raise them over your face.",
    muscle_group: "Triceps",
  },
  {
    name: "One Arm Dumbbell Reverse Wrist Curl",
    description:
      "Try to lower the dumbbell slowly to improve the effectiveness of the movement.",
    muscle_group: "Forearm",
  },
  {
    name: "One Arm Tricep Extension",
    description:
      "Take extra care to avoid accidentally hitting your head with the dumbbell on the way down.",
    muscle_group: "Triceps",
  },
  {
    name: "One Arm Dumbbell Wrist Curl",
    description:
      "Try to lower the dumbbell slowly to improve the effectiveness of the movement.",
    muscle_group: "Forearm",
  },
  {
    name: "Preacher Hammer Curl",
    description:
      "If the dumbbells are too large and get stuck on the pad when your arms are extended, try adjusting the seat.",
    muscle_group: "Biceps",
  },
  {
    name: "Dumbbell Pylo Squat",
    description:
      "Depending on the length of your arms, you may not be able to squat down low enough. If you can't squat until your thighs are parallel to the ground, hold the dumbbell up a little higher.",
    muscle_group: "Legs",
  },
  {
    name: "Seated Rear Lateral Raise",
    description:
      "Try to lift the dumbbells entirely through your shoulders, not your lower back.",
    muscle_group: "Shoulders",
  },
  {
    name: "Dumbbell Backwards Lunge",
    description: "Focus on maintaining balance above all else.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell Reverse Curl",
    description:
      "Keep your wrists up for the best effect, don't let them drop.",
    muscle_group: "Biceps",
  },
  {
    name: "Seated Hammer Wrist Curl",
    description:
      "If your knees get in the way of you lowering the dumbbells, point your legs more outward.",
    muscle_group: "Forearm",
  },
  {
    name: "Dumbbell Tricep Kickback",
    description:
      "Hold the dumbbells in place for an extra 1 second when your arms are fully extended for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Dumbbell Overhead Tricep Extension",
    description:
      "Try to keep your elbows pointed forward throughout the movement for the greatest effect.",
    muscle_group: "Triceps",
  },
  {
    name: "Dumbbell Stiff Legged Deadlift ",
    description:
      "If you aren't flexible enough to lower the dumbbells past your knees while maintaining a straight back and legs, lower them a shorter distance until your flexibility improves.",
    muscle_group: "Back",
  },
  {
    name: "Dumbbell Pullover",
    description:
      "Pay careful attention to your grip on the dumbbell, it is easy to accidentally drop if you are not paying attention.",
    muscle_group: "Back",
  },
  {
    name: "Zottman Curl",
    description:
      "Try to avoid lifting the dumbbells with your back or legs, only use your arms.",
    muscle_group: "Biceps",
  },
  {
    name: "EZ Bar Reverse Curl",
    description:
      "Do not allow your wrists to drop while lifting the EZ bar, keep them stiff.",
    muscle_group: "Biceps",
  },
  {
    name: "Plank",
    description: "Remember to breathe rhythmically throughout the movement.",
    muscle_group: "Abs",
  },
  {
    name: "Hanging Straight Leg Raise",
    description:
      "Inhale and lower your legs, returning to the starting position.",
    muscle_group: "Abs",
  },
  {
    name: "Knee Tuck",
    description:
      "To make the movement more difficult, you can keep your feet raised in between reps, keeping them from touching the ground.",
    muscle_group: "Abs",
  },
  {
    name: "Incline Straight Leg Raise",
    description: "The higher the incline, the harder the movement will be.",
    muscle_group: "Abs",
  },
  {
    name: "Jump Squat",
    description: "",
    muscle_group: "Legs",
  },
  {
    name: "Kettlebell Seesaw Press",
    description:
      "If you experience neck discomfort this movement can be performed without moving your head and only leaning your torso slightly to the side.",
    muscle_group: "Shoulders",
  },
  {
    name: "Stability Ball Leg Curl",
    description:
      "If you do not have access to a stability ball, you can improvise and use a foam roller instead.",
    muscle_group: "Legs",
  },
  {
    name: "T-Bar Row",
    description:
      "To increase the range of motion and effectiveness of this movement, use smaller sized weight plates on the bar.",
    muscle_group: "Back",
  },
  {
    name: "Lat Pulldown Machine",
    description: "Do not pull the bar down further than your shoulder level.",
    muscle_group: "Back",
  },
  {
    name: "High Row Machine",
    description:
      "If needed adjust the pad or seat height so that your thighs are properly secured. ",
    muscle_group: "Back",
  },
  {
    name: "Lateral Raise Machine",
    description:
      "For added benefit, adjust the machine so that your hands start closer together.",
    muscle_group: "Shoulders",
  },
  {
    name: "Preacher Curl Machine",
    description:
      "On most versions of this machine, you can adjust the seat so that you can comfortably rest your arms on the pad if needed.",
    muscle_group: "Biceps",
  },
  {
    name: "Chest Fly Machine",
    description:
      "Try to momentarily squeeze your chest consciously when your hands are close together for added benefit.",
    muscle_group: "Chest",
  },
  {
    name: "Hip Abduction Machine",
    description:
      "To maximize benefits, make sure the machine is set up so that your legs start close together.",
    muscle_group: "Legs",
  },
  {
    name: "Hip Adduction Machine",
    description:
      "To maximize benefits, make sure the machine is set up so that your legs start far apart.",
    muscle_group: "Legs",
  },
  {
    name: "Seated Leg Curl Machine",
    description:
      "To keep yourself firmly in the seat, try actively pulling yourself down towards it with the handles at your sides.",
    muscle_group: "Legs",
  },
  {
    name: "Reverse Fly Machine With Parallel Grip",
    description:
      "To maximize benefit, start with the handle grips as close together as you can without experiencing discomfort in your shoulders. If the machine at your gym as set up for performing a regular chest fly, you can usually adjust the starting position of the handles to set yourself up for a reverse fly instead.",
    muscle_group: "Back",
  },
  {
    name: "Reverse Fly Machine With Overhand Grip",
    description:
      "To maximize benefit, start with the handle grips as close together as you can without experiencing discomfort in your shoulders. If the machine at your gym as set up for performing a regular chest fly, you can usually adjust the starting position of the handles to set yourself up for a reverse fly instead.",
    muscle_group: "Back",
  },
  {
    name: "T-Bar Row Machine",
    description:
      "The further you lean forward, the more you'll focus on your upper back and the back part of your shoulders.",
    muscle_group: "Shoulders",
  },
  {
    name: "Olympic Parallel Bar Hammer Curl",
    description: "Lower the bar slowly for added benefit.",
    muscle_group: "Biceps",
  },
  {
    name: "Pull Up On Angled Bar",
    description:
      "If you want to increase the difficulty of this movement, hold a dumbbell between your feet by pressing them tightly together throughout the entire movement.",
    muscle_group: "Back",
  },
  {
    name: "Push Up",
    description:
      "Keep your abs tight if you are having trouble maintaining a straight torso.",
    muscle_group: "Chest",
  },
  {
    name: "Push Up With Back Extension",
    description:
      "Do not allow your knees to make contact with the floor, while pressing yourself up.",
    muscle_group: "Chest",
  },
  {
    name: "Shoulder Tap Push Up",
    description:
      "If you are unable to raise your hand at the start of the movement, try raising it when your arm is almost completely straight instead. Do this until you're strong enough to perform the movement regularly.",
    muscle_group: "Chest",
  },
  {
    name: "Side Plank",
    description:
      "Do not forget to breathe rhythmically throughout the duration of the movement.",
    muscle_group: "Abs",
  },
  {
    name: "Smith Machine Bench Press",
    description:
      "If you experience shoulder discomfort, try tucking your elbows in a little more.",
    muscle_group: "Chest",
  },
  {
    name: "Smith Machine Incline Bench Press",
    description:
      "If you experience shoulder discomfort, try tucking your elbows in a little more.",
    muscle_group: "Chest",
  },
  {
    name: "Smith Machine Shoulder Press",
    description:
      "Try to avoid accidentally hitting your chin with the bar when you press up.",
    muscle_group: "Shoulders",
  },
  {
    name: "Smith Machine Shrug",
    description: "Try to lower the bar slowly for greater benefit.",
    muscle_group: "Back",
  },
  {
    name: "Sumo Squat",
    description:
      "To increase the difficulty of this movement, continue until your thighs pass parallel to the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Superman Push Up",
    description:
      "Consciously tighten your abs to prevent your hips from dropping as you raise yourself up.",
    muscle_group: "Abs",
  },
  {
    name: "Floor Tricep Dips",
    description:
      "If you want to increase your range of motion, start with your butt raised higher up.",
    muscle_group: "Triceps",
  },
  {
    name: "Plate Curl",
    description:
      "You can use plates of all sizes for this movement as long as you can grip them and hold on long enough to perform it.",
    muscle_group: "Forearm",
  },
  {
    name: "Cable Oblique Crunch",
    description:
      "The higher the cable attachment you use, the harder this exercise will be.",
    muscle_group: "Abs",
  },
  {
    name: "Straight Leg Raise To Knee Tuck On Bench",
    description:
      "To increase the difficulty of this movement, start by positioning yourself more forward on the bench so that your thighs are also hanging over the ledge.",
    muscle_group: "Abs",
  },
  {
    name: "Cable Hip Extension",
    description:
      "If you don't have the attachment shown in the video, you can always improvise with a regular pulley handle, but it is not ideal.",
    muscle_group: "Legs",
  },
  {
    name: "Band Face Pull",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Shoulders",
  },
  {
    name: "Band Twist",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Glute Kickback Machine",
    description:
      "Some machines may have a pad for your active leg to push instead of a bar.",
    muscle_group: "Legs",
  },
  {
    name: "Cable Chest Press",
    description:
      "If the handles you use are uncomfortable, try switching them out for similar ones with a different grip.",
    muscle_group: "Chest",
  },
  {
    name: "One Arm Cable Tricep Kickback",
    description:
      "Focus on consciously squeezing your triceps for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Row",
    description:
      "Repeat this movement rhythmically for the duration of your cardio.",
    muscle_group: "Back",
  },
  {
    name: "Smith Machine Calf Raise",
    description:
      "You can substitute the item you are standing on for anything as long as it is sturdy, can support your weight, and will not move when you press on it.",
    muscle_group: "Legs",
  },
  {
    name: "Jump Lunge",
    description:
      "This movement is high impact, so take extra care to avoid your knee accidentally making contact with the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Kneeling Diamond Push Up",
    description:
      "If your knees hurt, try using a mat or other soft object like a towel to cushion them.",
    muscle_group: "Triceps",
  },
  {
    name: "Incline Dumbbell Front Raise",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train your shoulder muscles.",
    muscle_group: "Shoulders",
  },
  {
    name: "Flutter Kick",
    description:
      "Rhythmically breathe during this movement, inhaling whenever one leg reaches the highest point and exhaling when that same leg reaches the lowest point every time.",
    muscle_group: "Legs",
  },
  {
    name: "Weighted Twisting Crunch",
    description:
      "Exhale very deeply while raising your legs and torso for added benefit.",
    muscle_group: "Abs",
  },
  {
    name: "Bench Tricep Extension",
    description:
      "To make this exercise easier, you can bring your feet closer towards the bench and allow your knees to bend.",
    muscle_group: "Triceps",
  },
  {
    name: "Bodyweight Squat",
    description:
      "If you have the flexibility, squat down further until your thighs pass the point at which they are parallel to the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell Burpee",
    description: "As you get stronger, try to jump higher.",
    muscle_group: "Legs",
  },
  {
    name: "One Arm Lat Pulldown",
    description:
      "Prevent your torso from moving while you pull by consciously tightening your abs.",
    muscle_group: "Back",
  },
  {
    name: "One Arm Twisting Cable Floor Row",
    description: "This can be performed on a bench as well.",
    muscle_group: "Back",
  },
  {
    name: "Straight Leg Raise Hold",
    description:
      "You can increase the difficulty of this movement by preventing your feet from touching the ground between reps.",
    muscle_group: "Abs",
  },
  {
    name: "Wipers",
    description:
      "To increase the difficulty of this exercise, hold your legs in place for several seconds during the lowest point of the movement on each side of your body. Replicate whatever you do on one side on the other.",
    muscle_group: "Abs",
  },
  {
    name: "Decline Barbell Pullover",
    description:
      "Try to avoid bringing the barbell too far back behind your head, if your shoulders feel uncomfortable it's best to start with the barbell a little higher up.",
    muscle_group: "Chest",
  },
  {
    name: "Medium Cable Chest Fly",
    description:
      "Squeeze your chest while driving your arms forward and down for added benefit.",
    muscle_group: "Chest",
  },
  {
    name: "Clap Push Up",
    description:
      "If you cannot leave the ground by pushing as hard as you can, you are not strong enough to perform this movement yet. ",
    muscle_group: "Chest",
  },
  {
    name: "Chin Up",
    description:
      "Try to tighten your abs consciously to prevent your body from swinging during this movement.",
    muscle_group: "Biceps",
  },
  {
    name: "Bench Dip",
    description:
      "If you want to make the movement easier, try bringing your feet a little closer to the rest of your body and bending your legs slightly more.",
    muscle_group: "Triceps",
  },
  {
    name: "Reverse Hyper",
    description: "Keep your legs pressed together during the movement.",
    muscle_group: "Legs",
  },
  {
    name: "Pull Up",
    description:
      "If you want to increase the difficulty of this movement, hold a dumbbell between your feet by pressing them tightly together throughout the entire movement.",
    muscle_group: "Back",
  },
  {
    name: "Chest Dip",
    description:
      "Some chest dip stations have multiple hand grip settings, pick one and stick with it.",
    muscle_group: "Triceps",
  },
  {
    name: "Low Bar Barbell Back Squat",
    description:
      "Always keep a slight forward lean with a flat back while performing this movement to avoid dropping the barbell.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell Romanian Deadlift",
    description:
      "Do not lean back further than a neutral standing position because doing so can cause injury.",
    muscle_group: "Legs",
  },
  {
    name: "Forearm Push Up",
    description:
      "If this movement is too difficult, you can perform it on your knees instead.",
    muscle_group: "Triceps",
  },
  {
    name: "Straight Leg Kickback",
    description:
      "To make the movement easier, kick your leg back without extending it, maintaining bent knees.",
    muscle_group: "Legs",
  },
  {
    name: "Incline Chest Press Machine",
    description:
      "For best results, try to set up the machine so that your hands don't start far away from your chest or shoulders. ",
    muscle_group: "Chest",
  },
  {
    name: "Mid Shin Stiff Legged Barbell Deadlift",
    description:
      "Make sure to maintain a flat back above all else throughout the entire movement.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell Squat",
    description:
      "If you can, try to avoid allowing the dumbbells to touch the floor.",
    muscle_group: "Legs",
  },
  {
    name: "Cable Underhand Tricep Pushdown",
    description:
      "Focus on consciously squeezing your triceps while you press down for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Cable Curl With Curl Bar",
    description:
      "If a curved curl bar like the one animated makes your wrists feel uncomfortable, substitute it for a straight bar attachment instead.",
    muscle_group: "Biceps",
  },
  {
    name: "Preacher Curl",
    description:
      "For added benefit, squeeze your biceps consciously when lifting the barbell up.",
    muscle_group: "Biceps",
  },
  {
    name: "Cross Body Hammer Curl",
    description:
      "Squeeze your biceps as you curl the dumbbell upwards for added benefit.",
    muscle_group: "Forearm",
  },
  {
    name: "EZ Bar Concentration Curl",
    description:
      "If you do not have access to an EZ bar, you can substitute the EZ bar for a standard barbell.",
    muscle_group: "Biceps",
  },
  {
    name: "Smith Machine Curl",
    description:
      "Unlike other versions of the arm curl, your upper arm may need to move to perform this safely.",
    muscle_group: "Biceps",
  },
  {
    name: "Single Leg Stability Ball Squat",
    description:
      "If you have the strength and flexibility, you can squat down farther and stop when your thigh is parallel to the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Leaning Overhead Rope Tricep Extension",
    description:
      "The higher you keep your upper arms during this movement, the more you'll train the long head of your triceps.",
    muscle_group: "Triceps",
  },
  {
    name: "Close Grip Dumbbell Bench Press",
    description:
      "Focus on keeping your elbows tucked in, it's easy to accidentally let them rotate outwards.",
    muscle_group: "Chest",
  },
  {
    name: "Single Leg Dumbbell Deadlift",
    description:
      "If you have difficulty balancing on one foot, try bending down less far while lowering yourself. Gradually progress to the full range of motion as you improve.",
    muscle_group: "Legs",
  },
  {
    name: "Single Leg Squat",
    description:
      "If you have the strength and flexibility, you can squat down farther and stop when your thigh is parallel to the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Hanging Oblique Knee Tuck",
    description:
      "Try to avoid moving your arms or upper body at all during this movement.",
    muscle_group: "Abs",
  },
  {
    name: "Narrow Grip Pull Up",
    description:
      "Try to tighten your abs to keep your legs below you, preventing them from swinging as you pull yourself up.",
    muscle_group: "Back",
  },
  {
    name: "Reverse Push Up On Chair",
    description:
      "Make sure your elbows aren't positioned on the very edge of the chairs to minimize fall risk.",
    muscle_group: "Shoulders",
  },
  {
    name: "Side Plank Hip Adduction",
    description:
      "Do not forget to breathe rhythmically for the duration of the movement.",
    muscle_group: "Abs",
  },
  {
    name: "Incline Reverse Crunch",
    description:
      "Avoid pulling on your head with your hands as it can lead to discomfort in the neck area later on.",
    muscle_group: "Abs",
  },
  {
    name: "Straight Leg Raise With Hip Lift",
    description:
      "To make the movement easier, rest your legs on the ground between reps instead of keeping them elevated.",
    muscle_group: "Abs",
  },
  {
    name: "Overhead Crunch Machine ",
    description:
      "Exhale deeply while crunching forward to improve the effectiveness of the movement.",
    muscle_group: "Abs",
  },
  {
    name: "Hyperextension",
    description:
      "Make sure your feet are tightly secured behind you to avoid accidentally falling.",
    muscle_group: "Legs",
  },
  {
    name: "Hack Squat Machine",
    description:
      "Keep your feet flat on the floor of the machine, do not allow them to raise.",
    muscle_group: "Legs",
  },
  {
    name: "Elliptical",
    description:
      "This is a low impact version of cardio that is at low risk of agitating your knee.",
    muscle_group: "Legs",
  },
  {
    name: "Hip Thrust",
    description:
      "Try not to use your hands to push yourself up. Only use your lower body.",
    muscle_group: "Legs",
  },
  {
    name: "Recumbent Bike",
    description:
      "Remember to breathe rhythmically throughout the duration of this movement.",
    muscle_group: "Legs",
  },
  {
    name: "Chest Press Machine",
    description:
      "Grip the handles further apart to emphasize your chest more, or closer together to emphasize your triceps more.",
    muscle_group: "Chest",
  },
  {
    name: "Tricep Extension Machine",
    description:
      "If you lean further forward so that your arms start out more bent, your triceps will be better trained, but the involvement of the long rear head of the triceps will increase proportionally.",
    muscle_group: "Triceps",
  },
  {
    name: "Barbell Hip Thrust",
    description:
      "If the barbell feels uncomfortable on your hips, you can place a towel or other pad between your hips and the barbell to make the movement more pleasant. ",
    muscle_group: "Legs",
  },
  {
    name: "Barbell Split Squat On Bench",
    description:
      "If squatting down feels awkward, adjust the distance of the bench behind you by moving it.",
    muscle_group: "Legs",
  },
  {
    name: "Seated Row Machine",
    description:
      "If you want to increase biceps involvement, grab the handles that are parallel to the floor instead, using an underhand grip.",
    muscle_group: "Back",
  },
  {
    name: "Back Extension Machine",
    description:
      "Your gym may have a back extension machine with handles on the side of the seat. If it has them, hold onto them instead of crossing your arms in front of your chest. ",
    muscle_group: "Back",
  },
  {
    name: "Leg Press Machine",
    description:
      "If you are flexible enough, starting the machine's plate even closer to you will have added benefit.",
    muscle_group: "Legs",
  },
  {
    name: "Crunch Machine",
    description:
      "Exhale deeply as you crunch down to further activate your abs.",
    muscle_group: "Abs",
  },
  {
    name: "Spin Bike",
    description:
      "Remember to breathe rhythmically throughout the duration of this movement.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell Goblet Squat",
    description:
      "Focus your attention on holding the dumbbell in place because it can be difficult to maintain your grip during this movement.",
    muscle_group: "Legs",
  },
  {
    name: "Dumbbell High Shrug",
    description:
      "For added benefit, lower the dumbbells slowly while lowering them.",
    muscle_group: "Back",
  },
  {
    name: "Zottman Preacher Curl",
    description:
      "If the pad gets in the way of you lifting the dumbbells, you can adjust the seat height to help you position your body so that the dumbbells can move more freely.",
    muscle_group: "Forearm",
  },
  {
    name: "Stability Ball Rollout",
    description:
      "If you have trouble keeping your body stable during the movement, focus on consciously tightening your abs.",
    muscle_group: "Abs",
  },
  {
    name: "Stability Ball Crunch",
    description:
      "Try to avoid pulling on your head with your hands because it can lead to neck discomfort later on.",
    muscle_group: "Abs",
  },
  {
    name: "Inverted Row",
    description:
      "To make this movement easier, increase the height of the bar. To make it harder, lower it.",
    muscle_group: "Shoulders",
  },
  {
    name: "Bent Knee Inverted Row",
    description:
      "You can raise or lower the bar on the smith machine to adjust the difficulty. The higher the position, the easier this movement is.",
    muscle_group: "Shoulders",
  },
  {
    name: "Elbow To Knee Crunch",
    description:
      "Try not to pull on your head with your hand because it can lead to neck discomfort down the line.",
    muscle_group: "Abs",
  },
  {
    name: "Lying Crunch Machine",
    description:
      "Forcefully exhaling while raising yourself up can increase the effectiveness of this movement.",
    muscle_group: "Abs",
  },
  {
    name: "Seated Lateral Raise",
    description:
      "Try to lift the dumbbells mostly through your shoulders, not your lower back.",
    muscle_group: "Shoulders",
  },
  {
    name: "Shoulder Press Machine",
    description:
      "If you are flexible, you can start with the handles immediately at your shoulder level for greater benefit.",
    muscle_group: "Shoulders",
  },
  {
    name: "Outer Dumbbell Curl",
    description:
      "Focus on consciously squeezing your biceps while raising the dumbbells for added benefit.",
    muscle_group: "Biceps",
  },
  {
    name: "Ab Wheel Rollout",
    description:
      "To avoid discomfort in your knees, try to avoid kneeling on a hard surface. If you want, placing a towel, blanket, or small pillow underneath your knees can ease discomfort. For more of a challenge or for more advanced lifters, you can perform this movement with your legs straight out behind you instead of on your knees.",
    muscle_group: "Abs",
  },
  {
    name: "Barbell Split Squat",
    description: "Try to keep your toes pointed forward.",
    muscle_group: "Legs",
  },
  {
    name: "Frog Crunch",
    description:
      "Try not to pull on your head with your hands because it can lead to neck discomfort down the line.",
    muscle_group: "Abs",
  },
  {
    name: "EZ Bar Bench Press",
    description:
      "To emphasize your chest more, flare your elbows out. To focus more on your triceps, keep your elbows more tucked in.",
    muscle_group: "Triceps",
  },
  {
    name: "Sit Up",
    description:
      "Try not to pull on your head with your hands because it can lead to neck discomfort down the line.",
    muscle_group: "Abs",
  },
  {
    name: "Sled Push",
    description: "Remember to breathe rhythmically throughout the movement.",
    muscle_group: "Legs",
  },
  {
    name: "Cable Row",
    description:
      "Depending on your gym, the machine available to you may have separate footrests instead of a single plate.",
    muscle_group: "Back",
  },
  {
    name: "Calf Raise Machine",
    description:
      "To increase the effectiveness of this exercise, lower yourself down slowly during each rep.",
    muscle_group: "Legs",
  },
  {
    name: "Rope Crunch",
    description:
      "Exhale very deeply while crunching down to maximize the benefits of this movement.",
    muscle_group: "Abs",
  },
  {
    name: "Parallel Bar Twisting Leg Raise",
    description:
      "To increase the difficulty of this movement, hold your legs in place for several seconds when they are parallel to the ground.",
    muscle_group: "Abs",
  },
  {
    name: "Dumbbell Sumo Deadlift",
    description:
      "Do not lean back further than a neutral standing position because doing so can cause injury.",
    muscle_group: "Back",
  },
  {
    name: "Kettlebell Halo",
    description:
      "A kettlebell is preferable, but if you only have a light dumbbell, you can use that as well.",
    muscle_group: "Shoulders",
  },
  {
    name: "Kettlebell Angled Press",
    description:
      "If a kettlebell is unavailable, this movement can be performed with a single dumbbell.",
    muscle_group: "Shoulders",
  },
  {
    name: "Front Foot Elevated Goblet Split Squat",
    description:
      "You can get creative with what you use to elevate your foot. As long as it is a flat elevated surface and is stable, meaning it will not move, it can work.",
    muscle_group: "Legs",
  },
  {
    name: "Barbell Glute Bridge",
    description:
      "If the barbell feels uncomfortable on your hips, you can place a towel or other pad between your hips and the barbell to make the movement more pleasant. ",
    muscle_group: "Legs",
  },
  {
    name: "EZ Bar Pullover",
    description:
      "Try to avoid bringing the EZ bar too far back behind your head, if your shoulders feel uncomfortable it's best to start with the EZ bar a little higher up.",
    muscle_group: "Back",
  },
  {
    name: "Cable Assisted Nordic Leg Curl",
    description:
      "The higher the weight you use is, the easier this movement will be. ",
    muscle_group: "Legs",
  },
  {
    name: "Chair Dip",
    description:
      "If chairs are unavailable, try to replace them with other stable objects of a similar height.",
    muscle_group: "Triceps",
  },
  {
    name: "Chair Inverted Row",
    description:
      "If chairs are unavailable, try to replace them with other stable objects of a similar height.",
    muscle_group: "Shoulders",
  },
  {
    name: "Chair Calf Raise",
    description:
      "If you can't find a chair, holding onto other sturdy objects of a similar height may help.",
    muscle_group: "Legs",
  },
  {
    name: "Narrow Squat On Book",
    description:
      "Any sturdy flat item that can support your body weight and will not move can be used as a substitute item to perform this movement with.",
    muscle_group: "Legs",
  },
  {
    name: "Straight Leg Raise To Knee Tuck",
    description:
      "You can increase the difficulty of this movement by preventing your feet from touching the ground between reps.",
    muscle_group: "Abs",
  },
  {
    name: "Heel Touch Lateral Lunge",
    description:
      "As your flexibility increases, you should be able to step further away from your body.",
    muscle_group: "Legs",
  },
  {
    name: "Sprinter Lunge",
    description:
      "If you are not strong enough yet to stand up by only pushing through your front foot, you can use your hands and rear foot to help you while you gradually build up strength.",
    muscle_group: "Legs",
  },
  {
    name: "Jump Sprinter Lunge",
    description:
      "This movement is high impact, so take extra care to avoid your knee accidentally making contact with the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Around The World Superman Hold",
    description:
      "You can optionally hold your arms in place for 1-2 seconds When fully outstretched in front of you and again when by your sides to increase the difficulty of the movement.",
    muscle_group: "Back",
  },
  {
    name: "Elbow To Knee Sit Up",
    description: "Lower yourself down slowly for an added benefit.",
    muscle_group: "Abs",
  },
  {
    name: "Underhand Chair Inverted Row",
    description:
      "As you get stronger, try to decrease the amount you extend at your knees.",
    muscle_group: "Back",
  },
  {
    name: "Chair Pull Up",
    description:
      "As you get stronger, try to decrease the amount you extend at your knees.",
    muscle_group: "Back",
  },
  {
    name: "Cobra Push Up",
    description:
      "Try to explode up at the points where you push yourself up in this movement.",
    muscle_group: "Chest",
  },
  {
    name: "Kneeling Cobra Push Up",
    description:
      "If your knees hurt, try using a mat or other soft object like a towel to cushion them.",
    muscle_group: "Chest",
  },
  {
    name: "Kneeling Decline Push Up",
    description:
      "If you want to increase the difficulty of this movement, straighten your legs and place your feet on the box instead.",
    muscle_group: "Chest",
  },
  {
    name: "Decline Push Up",
    description:
      "To make this movement easier, place your feet on a table or bench rather than pressed against a wall.",
    muscle_group: "Chest",
  },
  {
    name: "Single Leg Box Squat",
    description:
      "If you cannot squat low enough, start with a higher box, and gradually work your way down to a smaller one.",
    muscle_group: "Legs",
  },
  {
    name: "Single Leg Heel Touch Squat",
    description:
      "Make sure you focus on maintaining a flat back when you bend your torso and lean forward to touch your heel. ",
    muscle_group: "Legs",
  },
  {
    name: "Reverse Push Up",
    description:
      "Try to avoid turning this movement into a crunch, focus on your back not your abs.",
    muscle_group: "Shoulders",
  },
  {
    name: "Alternating Straight Leg Raise",
    description:
      "Breathing out more forcefully while raising your leg can increase the emphasis placed on your abdominal muscles, but is not required.",
    muscle_group: "Abs",
  },
  {
    name: "Sliding Floor Pulldown",
    description:
      "If you do not have access to a slider, you can substitute it for another object that rolls, like a foam roller, and place it under the middle of your shin.",
    muscle_group: "Back",
  },
  {
    name: "Sliding Floor Bridge Curl",
    description:
      "If you do not have access to a slider, you can substitute it for another object that rolls, like a foam roller.",
    muscle_group: "Legs",
  },
  {
    name: "Assisted Straight Leg Raise",
    description:
      "If you are working out at home or don't have access to a bench, any sturdy object you can hold onto that will not move can work as a replacement.",
    muscle_group: "Abs",
  },
  {
    name: "Renegade Row",
    description:
      "This is an advanced movement and may be difficult to perform.",
    muscle_group: "Chest",
  },
  {
    name: "Starfish Crunch",
    description:
      "Even though you raise your head up with your arm in this movement, try not to bend at your neck, keep your head straight while raising it.",
    muscle_group: "Abs",
  },
  {
    name: "Spiderman Burpee",
    description:
      "The higher you jump, the more effective the movement will be.",
    muscle_group: "Chest",
  },
  {
    name: "Stepmill",
    description: "Remember to breathe rhythmically throughout the movement.",
    muscle_group: "Legs",
  },
  {
    name: "Leg Press Calf Raise",
    description: "For added benefit, lower your toes slowly on the way down.",
    muscle_group: "Legs",
  },
  {
    name: "Band Hip Abduction",
    description:
      "If you are having difficulty keeping your balance, perform the movement while positioning the inactive side of your body against a wall while still standing upright. ",
    muscle_group: "Legs",
  },
  {
    name: "Hanging Knee Tuck",
    description:
      "Try to avoid moving your arms or upper body at all during this movement.",
    muscle_group: "Abs",
  },
  {
    name: "Dumbbell Curl",
    description:
      "Squeeze your biceps consciously while curling up for added benefit.",
    muscle_group: "Biceps",
  },
  {
    name: "Front Raise",
    description:
      "You can optionally hold both dumbbells in place for 1 second when it is at the highest point for added training. Doing this too often can fatigue you faster so only do it occasionally. Just make sure to not go above shoulder height or hold them for longer than 1 second. ",
    muscle_group: "Shoulders",
  },
  {
    name: "Dumbbell Fly",
    description:
      "For added benefit, squeeze your chest consciously as you bring your arms together.",
    muscle_group: "Chest",
  },
  {
    name: "Leg Extension",
    description:
      "To keep yourself firmly in the seat, try actively pulling yourself down towards it with the handles at your sides.",
    muscle_group: "Legs",
  },
  {
    name: "Band Deep Curl",
    description:
      "If you don't feel tension in the band when you start curling your arms, take a step forward. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Biceps",
  },
  {
    name: "Lying Leg Curl",
    description: "For added benefit, lower your legs slowly.",
    muscle_group: "Legs",
  },
  {
    name: "Cable Push Down",
    description:
      "Try to consciously squeeze your triceps at the bottom for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "Band Lying Tricep Extension",
    description:
      "If you feel discomfort, you can place a mat or towel underneath you. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Triceps",
  },
  {
    name: "High Band Chest Press",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Chest",
  },
  {
    name: "Decline Twist",
    description:
      "Avoid pulling on your head with your hands as it can lead to discomfort in the neck area later on.",
    muscle_group: "Abs",
  },
  {
    name: "Close Grip Lat Pulldown",
    description:
      "Make sure the pad tightly secures your thighs, if it's too loose you'll have a hard time staying on the bench.",
    muscle_group: "Biceps",
  },
  {
    name: "Band Tricep Kickback",
    description:
      "Hold the band in place for an extra 1 second when your arms are fully extended for added benefit.",
    muscle_group: "Triceps",
  },
  {
    name: "One Arm Band Lateral Raise",
    description:
      "If you have the flexibility to do so, raise your arm several inches above shoulder-level. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Shoulders",
  },
  {
    name: "One Arm Band Leaning Overhead Tricep Extension Over Band",
    description:
      "Try to keep your torso upright as best as you can. If you lean too far forward you will alter the mechanics of the movement.",
    muscle_group: "Triceps",
  },
  {
    name: "Bent Over Row",
    description:
      "You can change the focus of this exercise slightly by changing up where you grip the barbell. Wider grips will favor the back muscles more while narrower grips will favor the biceps more. Just don't grab the barbell closer than shoulder-width.",
    muscle_group: "Back",
  },
  {
    name: "Band Preacher Curl",
    description:
      "If you have difficulty balancing, try widening your stance so that you feel more stable.  Continue to keep your arms shoulder-width apart. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Biceps",
  },
  {
    name: "Incline Dumbbell Press",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train your shoulder muscles.",
    muscle_group: "Chest",
  },
  {
    name: "Dumbbell Bench",
    description:
      "If you want to emphasize your triceps more, tuck your elbows in. Leave them flared out to focus more on your chest.",
    muscle_group: "Chest",
  },
  {
    name: "Dumbbell Row",
    description:
      "If a bench is not available, substitute it for another flat and sturdy surface that you are sure can support your body weight.",
    muscle_group: "Back",
  },
  {
    name: "Lying Tricep Extension",
    description:
      "If you do not have access to an EZ bar, you can substitute it for a barbell.",
    muscle_group: "Triceps",
  },
  {
    name: "Dumbbell Shoulder Press",
    description:
      "This could be performed while standing to increase the involvement of core muscles, but performing it seated with a backrest is better for focusing on shoulder and arm muscles. If performed seated, make sure your feet are firmly planted on the ground and your back is pressed firmly against the backrest throughout the entire movement. ",
    muscle_group: "Shoulders",
  },
  {
    name: "Rope Extension",
    description:
      "To emphasize the lateral head of your triceps even more, tuck your elbows a little further back.",
    muscle_group: "Triceps",
  },
  {
    name: "One Arm Band Cross Body Chest Press",
    description:
      "Standing farther away from where the band is tied to increase resistance. Stand closer to decreases resistance. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Chest",
  },
  {
    name: "Bench Press",
    description:
      "By having a spotter help you unrack the bar at the start of the lift, you will have an easier time during the rest of the lift. Just make sure you don't let them touch the barbell once you start benching unless you need help racking the barbell. ",
    muscle_group: "Chest",
  },
  {
    name: "Leg Press",
    description:
      "The further the machine goes, the greater the benefit. Adjust the safety mechanism accordingly.",
    muscle_group: "Legs",
  },
  {
    name: "Arnold Press",
    description:
      "This could be performed while standing to increase the involvement of core muscles, but performing it seated with a backrest is better for focusing on the development of shoulder and arm muscles. If performed seated, make sure your feet are firmly planted on the ground and your back is pressed firmly against the backrest throughout the entire movement. ",
    muscle_group: "Shoulders",
  },
  {
    name: "Lat Pulldown",
    description:
      "If your butt accidentally comes off the bench, you can adjust the pads or seat to make sure your thighs are secured properly.",
    muscle_group: "Back",
  },
  {
    name: "Reverse Crunch",
    description: "If you feel discomfort, you can place a mat underneath you.",
    muscle_group: "Abs",
  },
  {
    name: "Barbell Shoulder Press",
    description:
      "If you feel discomfort in your lower back during this movement, you may be leaning too far backward. Try to maintain an upright torso throughout the entire movement. If you struggle with this, squeezing your glutes and abs can help.",
    muscle_group: "Shoulders",
  },
  {
    name: "Band Chest Fly",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Chest",
  },
  {
    name: "Band Squat Twist",
    description:
      "Look in the direction of your hands throughout the movement to limit neck discomfort. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Legs",
  },
  {
    name: "Close Grip Band Row",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Back",
  },
  {
    name: "Barbell Curl",
    description:
      "If your wrists feel uncomfortable, you can substitute a regular barbell for the EZ curl bar.",
    muscle_group: "Biceps",
  },
  {
    name: "Lateral Raise",
    description:
      "For added benefit, hold the dumbbells for an extra 1 second before lowering them, when your arms are parallel to the floor.",
    muscle_group: "Shoulders",
  },
  {
    name: "Incline Dumbbell Fly",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train your shoulder muscles.",
    muscle_group: "Chest",
  },
  {
    name: "Band High Curl",
    description:
      "For added benefit, hold the fully bent position for an extra 1 second before allowing your arms to extend and return to the starting position. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Biceps",
  },
  {
    name: "Shrug",
    description:
      "This movement will benefit from you performing it slowly, try to drag out the length of each rep by lowering the barbell back down slowly each time.",
    muscle_group: "Back",
  },
  {
    name: "Leg Raise",
    description:
      "You can increase the difficulty of this movement by preventing your feet from touching the ground between reps.",
    muscle_group: "Abs",
  },
  {
    name: "Weighted Hanging Leg Raise To Knee Tuck",
    description:
      "Exhale very deeply while raising your legs for added benefit.",
    muscle_group: "Abs",
  },
  {
    name: "Weighted Decline Crunch",
    description:
      "To increase the difficulty of the movement, hold the plate overhead instead of directly over your chest.",
    muscle_group: "Abs",
  },
  {
    name: "Band Cross Chest Curl",
    description:
      "If you experience discomfort, you can optionally position the band at shoulder-level and perform this movement without leaning back. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Biceps",
  },
  {
    name: "Band Chest Press",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Chest",
  },
  {
    name: "Crunch",
    description:
      "Avoid pulling on your head with your hands as it can lead to discomfort in the neck area later on.",
    muscle_group: "Abs",
  },
  {
    name: "Decline Crunch",
    description:
      "Avoid pulling on your head with your hands because it can lead to discomfort in the neck area later on.",
    muscle_group: "Abs",
  },
  {
    name: "Dumbbell Calf Raise",
    description:
      "Balance is important in this movement, focus on it consciously to limit the risk of falling.",
    muscle_group: "Legs",
  },
  {
    name: "Band Reverse Crunch With Hip Raise",
    description:
      "If you feel discomfort, you can place a mat or towel underneath you. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Parallel Bar Straight Leg Raise Hold",
    description:
      "The length of time you hold the position can increase as you get stronger.",
    muscle_group: "Abs",
  },
  {
    name: "Side Bend",
    description:
      "Try not to pull on your head with your hand because it can lead to neck discomfort down the line.",
    muscle_group: "Abs",
  },
  {
    name: "Band Overhead Tricep Extension",
    description:
      "If your band is not long enough to allow you to fully extend your arms overhead, you can perform this movement by kneeling over the middle of a band instead. This will decrease ab and oblique involvement.",
    muscle_group: "Triceps",
  },
  {
    name: "Squat",
    description:
      "When squatting, make sure you stay within the safety bars of the rack. Do not walk so far back that you are outside of their range. ",
    muscle_group: "Legs",
  },
  {
    name: "Deadlift",
    description: "Grip the barbell tightly.",
    muscle_group: "Legs",
  },
  {
    name: "Band Overhead Side Bend",
    description:
      "To avoid accidentally rotating your torso, focus on keeping your belly button pointed forward. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Band Calf Raise",
    description:
      "You can increase the role of your traps by performing the entire movement with your shoulders shrugged, holding the shrug for the duration of the set. You should still keep your arms fully extended by your side.",
    muscle_group: "Legs",
  },
  {
    name: "Oblique Crunch",
    description:
      "Try to avoid pulling on your head with your hand as it can cause discomfort in your neck later on.",
    muscle_group: "Abs",
  },
  {
    name: "Band Air Bike",
    description:
      "To increase the difficulty of this movement, keep your inactive leg in the air. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Close Grip Band High Row",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Back",
  },
  {
    name: "Band Split Squat Over Band",
    description:
      "If your knees feel uncomfortable during this movement, try using a mat or towel, or try lowering yourself more slowly.",
    muscle_group: "Legs",
  },
  {
    name: "Band Reverse Fly",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Shoulders",
  },
  {
    name: "Band High Row",
    description:
      "For added resistance, you can wrap the band around the power rack or pole more than once. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Back",
  },
  {
    name: "Band Crunch",
    description:
      "If you feel discomfort, you can place a mat or towel underneath you. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Band Squat Over Band",
    description:
      "If you have the flexibility, squat down further until your thighs pass the point at which they are parallel to the ground.",
    muscle_group: "Legs",
  },
  {
    name: "Band Lat Pulldown",
    description:
      "Bend forward further to increase the involvement of your lats. Bend forward less to increase the involvement of your rear deltoids. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Back",
  },
  {
    name: "Incline Bench",
    description:
      "Select an incline between 30º-45º and stick with it. The higher the incline, the more you'll train your shoulder muscles.",
    muscle_group: "Chest",
  },
  {
    name: "Kneeling Band Crunch",
    description:
      "If you feel discomfort, you can place a mat or towel underneath you. The band can be wrapped around any stable object if a power rack or pole is not available.",
    muscle_group: "Abs",
  },
  {
    name: "Hammer Curl",
    description:
      "Squeeze your biceps as you curl the dumbbells upwards for added benefit.",
    muscle_group: "Biceps",
  },
  {
    name: "Air Bike",
    description:
      "Do not pull on your head with your arms. Doing so can lead to later discomfort in your neck. It is best to focus on using your abs to raise you up, consciously ignoring your arms.",
    muscle_group: "Abs",
  },
  {
    name: "Band Curl",
    description:
      "For added benefit, hold the top position of the rep for an extra 1 second before lowering your arms to return to the starting position.",
    muscle_group: "Biceps",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users and spots...");
  Exercise.collection
    .drop()
    .then(() => Exercise.insertMany(seedExercises))
    .then(() => {
      console.log("done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};