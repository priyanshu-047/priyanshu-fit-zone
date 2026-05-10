// ======================
// Women's Weight Loss Diet
// ======================
// ======================
// Low Budget Vegetarian Weight Loss Diet Plan
// For Women
// ======================

const meals = [

  {
    name: "Morning Detox",
    food: "Warm Water + Lemon",
    calories: 20
  },

  {
    name: "Breakfast",
    food: "Poha + Green Tea",
    calories: 250
  },

  {
    name: "Mid Morning",
    food: "1 Banana + Peanuts",
    calories: 180
  },

  {
    name: "Lunch",
    food: "2 Roti + Dal + Salad",
    calories: 420
  },

  {
    name: "Evening Snack",
    food: "Roasted Chana + Tea",
    calories: 160
  },

  {
    name: "Dinner",
    food: "Khichdi + Curd",
    calories: 350
  },

  {
    name: "Night",
    food: "Turmeric Milk",
    calories: 120
  }

];

// Elements
const mealList = document.getElementById("mealList");
const calorieProgress = document.getElementById("calorieProgress");
const calorieText = document.getElementById("calorieText");
const waterCount = document.getElementById("waterCount");
const dietDate = document.getElementById("dietDate");
const themeToggle = document.getElementById("themeToggle");

const maxCalories = 1500;

// Date
const today = new Date().toDateString();
dietDate.innerText = today;

// Reset Daily Data
const savedDate = localStorage.getItem("dietDate");

if(savedDate !== today){

  localStorage.setItem("dietDate", today);

  localStorage.setItem("completedMeals", JSON.stringify([]));

  localStorage.setItem("water", 0);
}

let completedMeals =
  JSON.parse(localStorage.getItem("completedMeals")) || [];

let water =
  Number(localStorage.getItem("water")) || 0;

// Render Meals
function renderMeals(){

  mealList.innerHTML = "";

  meals.forEach((meal,index)=>{

    const checked =
      completedMeals.includes(index);

    const card = document.createElement("div");

    card.className =
      checked ? "card completed" : "card";

    card.innerHTML = `

      <div class="left">

        <h2>${meal.name}</h2>

        <p>${meal.food}</p>

        <p>
          🔥 ${meal.calories} kcal
        </p>

      </div>

      <input
        type="checkbox"
        class="check"

        ${checked ? "checked" : ""}

        onchange="toggleMeal(${index})"
      >

    `;

    mealList.appendChild(card);

  });

  updateCalories();
}

// Toggle Meal
function toggleMeal(index){

  if(completedMeals.includes(index)){

    completedMeals =
      completedMeals.filter(i => i !== index);

  } else {

    completedMeals.push(index);
  }

  localStorage.setItem(
    "completedMeals",
    JSON.stringify(completedMeals)
  );

  renderMeals();
}

// Update Calories
function updateCalories(){

  let total = 0;

  completedMeals.forEach(index=>{

    total += meals[index].calories;

  });

  const percent =
    (total / maxCalories) * 100;

  calorieProgress.style.width =
    `${percent}%`;

  calorieText.innerText =
    `${total} / ${maxCalories} kcal`;
}

// Water Tracking
function addWater(){

  water++;

  localStorage.setItem("water", water);

  waterCount.innerText =
    `${water} Glasses`;
}

waterCount.innerText =
  `${water} Glasses`;

// Theme Toggle
themeToggle.addEventListener("click", ()=>{

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")){

    themeToggle.innerText = "☀️";

  } else {

    themeToggle.innerText = "🌙";
  }

});

// Initial Render
renderMeals();

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
   3D DIET CARD MOUSE TRACKING
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

// Reset on mouse leave
document.addEventListener('mouseleave', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.transform = 'translateY(-6px) rotateX(0) rotateY(0) translateZ(20px)';
  });
});

/* ===================================
   3D MEAL CHECKBOX FLIP
=================================== */

document.addEventListener('change', (e) => {
  if (e.target.classList.contains('check')) {
    const card = e.target.closest('.card');
    if (card) {
      e.target.style.animation = 'none';
      setTimeout(() => {
        e.target.style.animation = 'checkboxFlip 0.4s ease-out';
      }, 10);
    }
  }
});

// Add checkbox flip animation
const checkboxStyle = document.createElement('style');
checkboxStyle.textContent = `
  @keyframes checkboxFlip {
    0% { transform: rotateY(0deg) scale(1); }
    50% { transform: rotateY(90deg) scale(1.1); }
    100% { transform: rotateY(360deg) scale(1); }
  }
`;
document.head.appendChild(checkboxStyle);

/* ===================================
   3D WATER BUTTON ANIMATION
=================================== */

const waterBtn = document.querySelector('.water-btn');
if (waterBtn) {
  waterBtn.addEventListener('click', function() {
    this.style.animation = 'waterBubble 0.5s ease-out';
    setTimeout(() => {
      this.style.animation = 'none';
    }, 500);
  });
}

// Add water bubble animation
const waterStyle = document.createElement('style');
waterStyle.textContent = `
  @keyframes waterBubble {
    0% {
      transform: scale(1) rotateX(0deg);
      box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
    }
    50% {
      transform: scale(1.05) rotateX(10deg);
      box-shadow: 0 15px 35px rgba(6, 182, 212, 0.6);
    }
    100% {
      transform: scale(1) rotateX(0deg);
      box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
    }
  }
`;
document.head.appendChild(waterStyle);

/* ===================================
   3D CALORIE PROGRESS ANIMATION
=================================== */

function updateCalories(){

  let total = 0;

  completedMeals.forEach(index=>{

    total += meals[index].calories;

  });

  const percent =
    (total / maxCalories) * 100;

  calorieProgress.style.width =
    `${percent}%`;

  calorieText.innerText =
    `${total} / ${maxCalories} kcal`;
    
  // Add 3D effects to progress bar
  calorieProgress.style.boxShadow = `
    0 0 15px rgba(139, 92, 246, 0.6),
    inset 0 2px 4px rgba(255, 255, 255, 0.2),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2)
  `;
}

/* ===================================
   3D BOX CARDS
=================================== */

window.addEventListener('scroll', () => {
  const boxes = document.querySelectorAll('.box');
  const windowCenter = window.innerHeight / 2;
  
  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const boxCenter = rect.top + rect.height / 2;
    const distance = Math.abs(windowCenter - boxCenter);
    const rotation = Math.min(distance / 150, 3);
    
    box.style.transform = `
      rotateX(${rotation * 0.3}deg)
      rotateY(${rotation * 0.15}deg)
      translateZ(${Math.max(0, 15 - distance / 80)}px)
    `;
  });
});