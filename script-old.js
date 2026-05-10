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
// Get YouTube Video ID
function getYoutubeId(url){
  return url.split("/embed/")[1];
}

// Load iframe only on click
function loadVideo(button, videoUrl){

  const container = button.parentElement;

  container.innerHTML = `
    <iframe
      class="demo-video"
      src="${videoUrl}?autoplay=1&rel=0"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
    ></iframe>
  `;
}

function renderWorkouts() {

    workoutList.innerHTML = "";

    workouts.forEach((workout, index) => {

        const checked = completed.includes(index);

        const card = document.createElement("div");
        card.className = checked ? "card completed" : "card";

        card.innerHTML = `
  <div class="left">

    <div class="video-container">

      <img
        src="https://img.youtube.com/vi/${getYoutubeId(workout.video)}/hqdefault.jpg"
        class="video-thumb"
        alt="${workout.name}"
      >

      <button
        class="play-btn"
        onclick="loadVideo(this, '${workout.video}')"
      >
        ▶
      </button>

    </div>

    <h2>${workout.name}</h2>

    <p>
      ${workout.sets} Sets • ${workout.reps} Reps
    </p>

  </div>

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

// =========================
// MOBILE NAVBAR
// =========================

document.addEventListener("DOMContentLoaded", ()=>{

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  if(menuToggle && navLinks){

    menuToggle.addEventListener("click", ()=>{

      navLinks.classList.toggle("active");

    });

  }

});

/* ===================================
   3D CARD MOUSE TRACKING EFFECT
=================================== */

document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) * 0.008;
    const rotateY = (centerX - x) * 0.008;
    
    // Apply subtle 3D rotation based on mouse
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    card.style.transform = `
      translateY(-6px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
    `;
  });
});

// Reset card transforms on mouse leave
document.addEventListener('mouseleave', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.transform = 'translateY(-6px) rotateX(0) rotateY(0) translateZ(20px)';
  });
});

/* ===================================
   3D CHECKBOX ANIMATION
=================================== */

document.addEventListener('change', (e) => {
  if (e.target.classList.contains('check')) {
    const card = e.target.closest('.card');
    if (card) {
      // Animate checkbox with 3D flip
      e.target.style.animation = 'none';
      setTimeout(() => {
        e.target.style.animation = 'checkboxFlip 0.4s ease-out';
      }, 10);
    }
  }
});

// Add checkbox flip animation to the page
const checkboxStyle = document.createElement('style');
checkboxStyle.textContent = `
  @keyframes checkboxFlip {
    0% {
      transform: rotateY(0deg) scale(1);
    }
    50% {
      transform: rotateY(90deg) scale(1.1);
    }
    100% {
      transform: rotateY(360deg) scale(1);
    }
  }
`;
document.head.appendChild(checkboxStyle);

/* ===================================
   3D SCROLL CARD ANIMATION
=================================== */

window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.card');
  const windowCenter = window.innerHeight / 2;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const distance = Math.abs(windowCenter - cardCenter);
    const rotation = Math.min(distance / 100, 5);
    
    // 3D depth effect based on scroll position
    card.style.transform = `
      translateY(-6px)
      rotateX(${rotation * 0.2}deg)
      rotateY(${rotation * 0.1}deg)
      translateZ(${Math.max(0, 20 - distance / 50)}px)
    `;
  });
});

/* ===================================
   3D PLAY BUTTON EFFECT
=================================== */

document.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('play-btn')) {
    e.target.style.animation = 'pulseRotate 0.6s ease-out';
  }
});

const playBtnStyle = document.createElement('style');
playBtnStyle.textContent = `
  @keyframes pulseRotate {
    0% {
      transform: translate(-50%, -50%) scale(1) rotateY(0deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.15) rotateY(180deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(1.1) rotateY(360deg);
    }
  }
`;
document.head.appendChild(playBtnStyle);

/* ===================================
   3D PROGRESS BAR ANIMATION
=================================== */

function updateProgress() {
    const percent = (completed.length / workouts.length) * 100;
    
    progress.style.width = `${percent}%`;
    progressText.innerText = `${Math.round(percent)}% Completed`;
    
    // Add 3D depth to progress bar
    progress.style.boxShadow = `
      0 0 15px rgba(139, 92, 246, 0.6),
      inset 0 2px 4px rgba(255, 255, 255, 0.2),
      inset 0 -2px 4px rgba(0, 0, 0, 0.2)
    `;
}