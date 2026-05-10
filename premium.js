/* ============================================
   PREMIUM FITNESS TRACKER - JAVASCRIPT
   ============================================ */

// State Management
const state = {
  currentPage: 'home',
  currentWeek: 0,
  theme: localStorage.getItem('theme') || 'dark',
  workouts: JSON.parse(localStorage.getItem('workouts')) || {},
  meals: JSON.parse(localStorage.getItem('meals')) || {},
  isAddingWorkout: false,
  isAddingMeal: false,
};

// Days of week
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadDashboard();
});

// ============================================
// INITIALIZATION
// ============================================

function initializeApp() {
  // Set theme
  if (state.theme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeToggle').textContent = '☀️';
  }

  // Initialize data structure
  if (Object.keys(state.workouts).length === 0) {
    for (let week = 0; week < 4; week++) {
      state.workouts[`week-${week}`] = {};
      DAYS.forEach(day => {
        state.workouts[`week-${week}`][day] = [];
      });
    }
    saveWorkouts();
  }

  if (Object.keys(state.meals).length === 0) {
    for (let week = 0; week < 4; week++) {
      state.meals[`week-${week}`] = {};
      DAYS.forEach(day => {
        state.meals[`week-${week}`][day] = [];
      });
    }
    saveMeals();
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Menu toggle
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
  });

  // Navigation link active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.getElementById('navMenu').classList.remove('active');
    });
  });

  // Hero buttons
  document.getElementById('startWorkoutBtn')?.addEventListener('click', () => navigateTo('workout'));
  document.getElementById('startDietBtn')?.addEventListener('click', () => navigateTo('diet'));

  // Week selectors
  document.getElementById('weekSelect')?.addEventListener('change', (e) => {
    state.currentWeek = parseInt(e.target.value);
    renderWorkoutPage();
  });

  document.getElementById('dietWeekSelect')?.addEventListener('change', (e) => {
    state.currentWeek = parseInt(e.target.value);
    renderDietPage();
  });

  // Add buttons
  document.getElementById('addWorkoutBtn')?.addEventListener('click', () => openAddModal('workout'));
  document.getElementById('addMealBtn')?.addEventListener('click', () => openAddModal('meal'));

  // Modal close
  document.getElementById('modalClose')?.addEventListener('click', closeAddModal);
  document.getElementById('addModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'addModal') closeAddModal();
  });

  // Form submit
  document.getElementById('addForm')?.addEventListener('submit', handleAddItem);
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
  state.currentPage = page;
  
  // Hide all pages
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('workoutPage').style.display = 'none';
  document.getElementById('dietPage').style.display = 'none';
  document.getElementById('statsPage').style.display = 'none';

  // Show selected page
  switch(page) {
    case 'home':
      document.getElementById('homePage').style.display = 'block';
      loadDashboard();
      break;
    case 'workout':
      document.getElementById('workoutPage').style.display = 'block';
      renderWorkoutPage();
      break;
    case 'diet':
      document.getElementById('dietPage').style.display = 'block';
      renderDietPage();
      break;
    case 'stats':
      document.getElementById('statsPage').style.display = 'block';
      renderStatsPage();
      break;
  }
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
  updateDashboardStats();
}

function updateDashboardStats() {
  let totalWorkouts = 0;
  let totalMeals = 0;

  Object.values(state.workouts).forEach(week => {
    Object.values(week).forEach(day => {
      totalWorkouts += day.length;
    });
  });

  Object.values(state.meals).forEach(week => {
    Object.values(week).forEach(day => {
      totalMeals += day.length;
    });
  });

  document.getElementById('totalWorkouts').textContent = totalWorkouts;
  document.getElementById('totalMeals').textContent = totalMeals;
  
  // Calculate streak
  const streak = calculateStreak();
  document.getElementById('currentStreak').textContent = streak;
  
  // Calculate fitness score
  const score = calculateFitnessScore();
  document.getElementById('fitnessScore').textContent = score;

  // Week stats
  const thisWeekWorkouts = Object.values(state.workouts['week-0'] || {}).flat().length;
  document.getElementById('weekStats').textContent = `${thisWeekWorkouts} workouts completed`;

  // Progress
  const progress = Math.min((thisWeekWorkouts / 21) * 100, 100);
  document.getElementById('progressMini').style.width = progress + '%';

  // Achievements
  const achievements = calculateAchievements();
  document.getElementById('achievements').textContent = achievements + ' Unlocked';
}

function calculateStreak() {
  // Simple streak calculation
  const today = new Date().getDay();
  let streak = 0;
  
  for (let i = 0; i < 7; i++) {
    const dayIndex = (today - i + 7) % 7;
    const dayName = DAYS[dayIndex];
    const dayWorkouts = state.workouts['week-0']?.[dayName]?.length || 0;
    
    if (dayWorkouts > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function calculateFitnessScore() {
  const thisWeek = state.workouts['week-0'] || {};
  const totalWorkouts = Object.values(thisWeek).flat().length;
  const totalCalories = Object.values(thisWeek).flat().reduce((sum, w) => sum + (w.calories || 0), 0);
  
  let score = Math.min(totalWorkouts * 10, 100);
  score += Math.min((totalCalories / 100), 50);
  
  return Math.min(score, 100).toFixed(0);
}

function calculateAchievements() {
  let achievements = 0;
  
  // Check achievements
  const allWorkouts = Object.values(state.workouts).flatMap(w => Object.values(w).flat());
  if (allWorkouts.length >= 10) achievements++;
  if (allWorkouts.length >= 30) achievements++;
  
  const streakDays = calculateStreak();
  if (streakDays >= 3) achievements++;
  if (streakDays >= 7) achievements++;
  
  return achievements;
}

// ============================================
// WORKOUT PAGE
// ============================================

function renderWorkoutPage() {
  const weekKey = `week-${state.currentWeek}`;
  const weekData = state.workouts[weekKey] || {};
  const grid = document.getElementById('workoutGrid');

  grid.innerHTML = '';

  DAYS.forEach((day, index) => {
    const dayWorkouts = weekData[day] || [];
    const isCompleted = dayWorkouts.length > 0;

    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="day-header">
        <span class="day-name">${day}</span>
        <div class="day-indicator ${isCompleted ? 'completed' : ''}">${index + 1}</div>
      </div>

      <div class="day-items">
        ${dayWorkouts.map((workout, idx) => `
          <div class="item">
            <div>
              <div class="item-name">${workout.name}</div>
              <div class="item-meta">${workout.duration} min • ${workout.calories} kcal</div>
            </div>
            <div class="item-actions">
              <button class="item-btn" onclick="editWorkout('${weekKey}', '${day}', ${idx})">✎</button>
              <button class="item-btn" onclick="deleteWorkout('${weekKey}', '${day}', ${idx})">✕</button>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="day-add" onclick="openAddModalForDay('workout', '${day}')">+ Add Workout</button>
    `;

    grid.appendChild(card);
  });

  updateWorkoutDetails(weekData);
}

function updateWorkoutDetails(weekData) {
  const container = document.getElementById('workoutDetails');
  
  let totalWorkouts = 0;
  let totalDuration = 0;
  let totalCalories = 0;
  let activeDays = 0;

  Object.values(weekData).forEach(dayWorkouts => {
    if (dayWorkouts.length > 0) {
      activeDays++;
      totalWorkouts += dayWorkouts.length;
      totalDuration += dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
      totalCalories += dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    }
  });

  container.innerHTML = `
    <h3>Weekly Summary</h3>
    <div class="details-grid">
      <div class="detail-stat">
        <h4>Total Workouts</h4>
        <div class="detail-value">${totalWorkouts}</div>
      </div>
      <div class="detail-stat">
        <h4>Active Days</h4>
        <div class="detail-value">${activeDays}/7</div>
      </div>
      <div class="detail-stat">
        <h4>Total Duration</h4>
        <div class="detail-value">${totalDuration}</div>
        <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.5rem;">minutes</p>
      </div>
      <div class="detail-stat">
        <h4>Calories Burned</h4>
        <div class="detail-value">${totalCalories}</div>
      </div>
    </div>
  `;
}

function deleteWorkout(weekKey, day, index) {
  state.workouts[weekKey][day].splice(index, 1);
  saveWorkouts();
  renderWorkoutPage();
}

// ============================================
// DIET PAGE
// ============================================

function renderDietPage() {
  const weekKey = `week-${state.currentWeek}`;
  const weekData = state.meals[weekKey] || {};
  const grid = document.getElementById('dietGrid');

  grid.innerHTML = '';

  DAYS.forEach((day, index) => {
    const dayMeals = weekData[day] || [];
    const dayCalories = dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const isCompleted = dayCalories >= 1500;

    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="day-header">
        <span class="day-name">${day}</span>
        <div class="day-indicator ${isCompleted ? 'completed' : ''}">${index + 1}</div>
      </div>

      <div class="day-items">
        ${dayMeals.map((meal, idx) => `
          <div class="item">
            <div>
              <div class="item-name">${meal.name}</div>
              <div class="item-meta">${meal.type} • ${meal.calories} kcal</div>
            </div>
            <div class="item-actions">
              <button class="item-btn" onclick="editMeal('${weekKey}', '${day}', ${idx})">✎</button>
              <button class="item-btn" onclick="deleteMeal('${weekKey}', '${day}', ${idx})">✕</button>
            </div>
          </div>
        `).join('')}
      </div>

      <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        ${dayCalories} / 1500 kcal
      </p>

      <button class="day-add" onclick="openAddModalForDay('meal', '${day}')">+ Add Meal</button>
    `;

    grid.appendChild(card);
  });

  updateDietSummary(weekData);
}

function updateDietSummary(weekData) {
  const container = document.getElementById('dietSummary');
  
  let totalMeals = 0;
  let totalCalories = 0;
  let activeDays = 0;

  Object.values(weekData).forEach(dayMeals => {
    if (dayMeals.length > 0) {
      activeDays++;
      totalMeals += dayMeals.length;
      totalCalories += dayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
    }
  });

  const avgCalories = activeDays > 0 ? (totalCalories / activeDays).toFixed(0) : 0;

  container.innerHTML = `
    <h3>Weekly Summary</h3>
    <div class="details-grid">
      <div class="detail-stat">
        <h4>Total Meals</h4>
        <div class="detail-value">${totalMeals}</div>
      </div>
      <div class="detail-stat">
        <h4>Total Calories</h4>
        <div class="detail-value">${totalCalories}</div>
      </div>
      <div class="detail-stat">
        <h4>Avg per Day</h4>
        <div class="detail-value">${avgCalories}</div>
      </div>
      <div class="detail-stat">
        <h4>Active Days</h4>
        <div class="detail-value">${activeDays}/7</div>
      </div>
    </div>
  `;
}

function deleteMeal(weekKey, day, index) {
  state.meals[weekKey][day].splice(index, 1);
  saveMeals();
  renderDietPage();
}

// ============================================
// STATISTICS PAGE
// ============================================

function renderStatsPage() {
  let totalWorkouts = 0;
  let totalCalories = 0;
  let consistency = 0;
  let bestStreak = 0;

  // Calculate stats
  Object.values(state.workouts).forEach(week => {
    Object.values(week).forEach(day => {
      totalWorkouts += day.length;
    });
  });

  Object.values(state.meals).forEach(week => {
    Object.values(week).forEach(day => {
      totalCalories += day.reduce((sum, m) => sum + (m.calories || 0), 0);
    });
  });

  // Consistency
  let totalDays = 0;
  let activeDays = 0;
  Object.values(state.workouts).forEach(week => {
    Object.values(week).forEach(day => {
      totalDays++;
      if (day.length > 0) activeDays++;
    });
  });
  consistency = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;

  // Best streak
  let currentStreak = 0;
  Object.values(state.workouts['week-0']).forEach(day => {
    if (day.length > 0) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  // Update display
  document.getElementById('statsTotal').textContent = totalWorkouts;
  document.getElementById('statsCalories').textContent = totalCalories;
  document.getElementById('statsConsistency').textContent = consistency + '%';
  document.getElementById('statsBestStreak').textContent = bestStreak;
}

// ============================================
// MODAL
// ============================================

function openAddModal(type) {
  state.isAddingWorkout = type === 'workout';
  state.isAddingMeal = type === 'meal';

  const modal = document.getElementById('addModal');
  const form = document.getElementById('addForm');
  const title = document.getElementById('modalTitle');
  const mealGroup = document.getElementById('mealGroup');

  form.reset();

  if (type === 'workout') {
    title.textContent = 'Add Workout';
    mealGroup.style.display = 'none';
  } else {
    title.textContent = 'Add Meal';
    mealGroup.style.display = 'block';
  }

  modal.classList.add('active');
}

function openAddModalForDay(type, day) {
  openAddModal(type);
  document.getElementById('itemDay').value = day;
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('active');
}

function handleAddItem(e) {
  e.preventDefault();

  const day = document.getElementById('itemDay').value;
  const name = document.getElementById('itemName').value;
  const duration = parseInt(document.getElementById('itemDuration').value);
  const calories = parseInt(document.getElementById('itemCalories').value);

  const weekKey = `week-${state.currentWeek}`;

  if (state.isAddingWorkout) {
    const workout = { name, duration, calories };
    state.workouts[weekKey][day].push(workout);
    saveWorkouts();
    renderWorkoutPage();
  } else {
    const type = document.getElementById('itemType').value;
    const meal = { name, type, calories };
    state.meals[weekKey][day].push(meal);
    saveMeals();
    renderDietPage();
  }

  closeAddModal();
  updateDashboardStats();
}

// ============================================
// THEME
// ============================================

function toggleTheme() {
  const isDark = document.body.classList.toggle('light-mode');
  state.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ============================================
// STORAGE
// ============================================

function saveWorkouts() {
  localStorage.setItem('workouts', JSON.stringify(state.workouts));
}

function saveMeals() {
  localStorage.setItem('meals', JSON.stringify(state.meals));
}

// ============================================
// UTILITY
// ============================================

function editWorkout(weekKey, day, index) {
  // Placeholder for edit functionality
  alert('Edit functionality coming soon!');
}

function editMeal(weekKey, day, index) {
  // Placeholder for edit functionality
  alert('Edit functionality coming soon!');
}
