// ==========================
// Workout Data
// Edit workouts here
// ==========================

// Women's Weight Loss Workout Plan

// Complete Women's Weight Loss Workout Plan
// With Online Demo Videos

// Advanced Women's Home Weight Loss Workout Plan

// Advanced Full Body Home Weight Loss Workout Plan
// With YouTube Demo Videos

const workouts = [

    {
        name: "Jumping Jacks",
        reps: 50,
        sets: 4,
        video: "https://www.youtube.com/embed/c4DAnQ6DtF8"
    },

    {
        name: "High Knees",
        reps: "60 sec",
        sets: 4,
        video: "https://www.youtube.com/embed/oDdkytliOqE"
    },

    {
        name: "Mountain Climbers",
        reps: 40,
        sets: 4,
        video: "https://www.youtube.com/embed/nmwgirgXLYM"
    },

    {
        name: "Burpees",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/TU8QYVW0gDU"
    },

    {
        name: "Squats",
        reps: 30,
        sets: 5,
        video: "https://www.youtube.com/embed/aclHkVaku9U"
    },

    {
        name: "Jump Squats",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/A-cFYWvaHr0"
    },

    {
        name: "Lunges",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
    },

    {
        name: "Glute Bridges",
        reps: 25,
        sets: 4,
        video: "https://www.youtube.com/embed/wPM8icPu6H8"
    },

    {
        name: "Push Ups",
        reps: 15,
        sets: 4,
        video: "https://www.youtube.com/embed/IODxDxX7oi4"
    },

    {
        name: "Plank",
        reps: "90 sec",
        sets: 3,
        video: "https://www.youtube.com/embed/pSHjTRCQxIw"
    },

    {
        name: "Side Plank",
        reps: "45 sec",
        sets: 3,
        video: "https://www.youtube.com/embed/K2VljzCC16g"
    },

    {
        name: "Russian Twists",
        reps: 40,
        sets: 4,
        video: "https://www.youtube.com/embed/wkD8rjkodUI"
    },

    {
        name: "Leg Raises",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/JB2oyawG9KI"
    },

    {
        name: "Bicycle Crunches",
        reps: 30,
        sets: 4,
        video: "https://www.youtube.com/embed/9FGilxCbdz8"
    },

    {
        name: "Wall Sit",
        reps: "60 sec",
        sets: 3,
        video: "https://www.youtube.com/embed/y-wV4Venusw"
    },

    {
        name: "Donkey Kicks",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/SuXbW5gKTuI"
    },

    {
        name: "Fire Hydrants",
        reps: 20,
        sets: 4,
        video: "https://www.youtube.com/embed/La3xYT8MGks"
    },

    {
        name: "Skaters",
        reps: 30,
        sets: 4,
        video: "https://www.youtube.com/embed/xdHyrzid1Ng"
    },

    {
        name: "Toe Touch Crunches",
        reps: 25,
        sets: 4,
        video: "https://www.youtube.com/embed/owDT5T2bW_M"
    },

    {
        name: "Cool Down Stretch",
        reps: "5 min",
        sets: 1,
        video: "https://www.youtube.com/embed/g_tea8ZNk5A"
    }

];

// Elements
const workoutList = document.getElementById("workoutList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const streakText = document.getElementById("streak");
const dateText = document.getElementById("date");
const themeToggle = document.getElementById("themeToggle");

// Date
const today = new Date().toDateString();
dateText.innerText = today;

// ==========================
// Local Storage Reset Logic
// ==========================

const savedDate = localStorage.getItem("date");

if (savedDate !== today) {
    localStorage.setItem("completed", JSON.stringify([]));
    localStorage.setItem("date", today);

    let streak = Number(localStorage.getItem("streak")) || 0;
    streak++;
    localStorage.setItem("streak", streak);
}

// Get saved completed workouts
let completed = JSON.parse(localStorage.getItem("completed")) || [];

// Display streak
streakText.innerText = `${localStorage.getItem("streak") || 0} Days`;

// ==========================
// Render Workouts
// ==========================

function renderWorkouts() {

    workoutList.innerHTML = "";

    workouts.forEach((workout, index) => {

        const checked = completed.includes(index);

        const card = document.createElement("div");
        card.className = checked ? "card completed" : "card";

        card.innerHTML = `
  <div class="left">

    <iframe
      class="demo-video"
      src="${workout.video}?autoplay=1&mute=1&loop=1&rel=0"
      title="${workout.name}"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
    ></iframe>

    <h2>${workout.name}</h2>

    <p>
      ${workout.sets} Sets • ${workout.reps} Reps
    </p>

  </div>
  <label class="check">
  Done <label>
  <input
    type="checkbox"
    class="check"
    ${checked ? "checked" : ""}
    onchange="toggleWorkout(${index})"
  >
 
`;
        workoutList.appendChild(card);

    });

    updateProgress();
}

// ==========================
// Toggle Workout
// ==========================

function toggleWorkout(index) {

    if (completed.includes(index)) {
        completed = completed.filter(i => i !== index);
    } else {
        completed.push(index);
    }

    localStorage.setItem("completed", JSON.stringify(completed));

    renderWorkouts();
}

// ==========================
// Progress Bar
// ==========================

function updateProgress() {

    const percent = (completed.length / workouts.length) * 100;

    progress.style.width = `${percent}%`;
    progressText.innerText = `${Math.round(percent)}% Completed`;
}

// ==========================
// Theme Toggle
// ==========================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeToggle.innerText = "☀️";
    } else {
        themeToggle.innerText = "🌙";
    }

});

// Initial Render
renderWorkouts();