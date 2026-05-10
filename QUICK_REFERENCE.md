# 🎯 FitZone - Quick Reference Guide

## Navigation

| Button | Action |
|--------|--------|
| **Dashboard** | View home page with statistics |
| **Workout** | Manage weekly workouts |
| **Diet** | Plan weekly meals |
| **Statistics** | View performance metrics |
| **🌙/☀️** | Toggle Dark/Light mode |

---

## Dashboard Overview

```
┌─────────────────────────────────────┐
│   Welcome! 💪 🥗 🔥 ⭐             │
│   Transform Your Body in 30 Days    │
│   [Start Workout]  [Plan Diet]      │
│                                     │
│  Workouts: 25   Meals: 48           │
│  Streak: 5 Days  Score: 78/100      │
│                                     │
│  📊 This Week: 7 workouts           │
│  🎯 Progress: 65%                   │
│  🏆 Achievements: 3 Unlocked        │
└─────────────────────────────────────┘
```

---

## Adding a Workout

### Step 1: Click "+ Add Workout"
- Opens a modal dialog
- Form appears with input fields

### Step 2: Fill Details
```
Day:       Monday ▼
Name:      Running
Duration:  30 (minutes)
Calories:  300
          [Add]
```

### Step 3: Submit
- Click "Add" button
- Data saves automatically
- Modal closes
- Card updates immediately

---

## Adding a Meal

### Step 1: Click "+ Add Meal"
- Modal opens with meal form

### Step 2: Fill Details
```
Day:       Tuesday ▼
Name:      Grilled Chicken
Type:      Lunch ▼
Calories:  450
          [Add]
```

### Step 3: Submit
- Click "Add" button
- Meal saved to that day
- Calorie counter updates
- Page refreshes

---

## Weekly View

### Switching Weeks
```
Select from dropdown: [This Week ▼]
- This Week (Week 0)
- Next Week (Week 1)
- Week 3
- Week 4
```

### Day Card Layout
```
┌─────────────────────┐
│  Monday           [1]│  ← Day indicator
│                     │
│  Running           │
│  30 min • 300 cal  │  ← Item details
│                     │
│  Yoga              │
│  45 min • 200 cal  │
│                     │
│  [+ Add Workout]    │  ← Add button
└─────────────────────┘
```

### Card Colors
- **White Indicator**: Day not completed
- **Green Indicator**: Day has activities
- **Blue Hover**: Lift effect on hover

---

## Statistics Explained

### Metric Definitions

| Metric | Calculation | Meaning |
|--------|-------------|---------|
| **Total Workouts** | Sum of all workouts | How many exercises done |
| **Avg Calories** | Total ÷ Days | Average per day |
| **Consistency** | (Active Days ÷ Total) × 100 | % of days tracked |
| **Best Streak** | Max consecutive days | Longest active period |

### Weekly Activity Chart
```
█  ← Height = Number of workouts
█  █  ← Each bar = One day
█  █  █
█  █  █  █
█  █  █  █  █
█  █  █  █  █  █
█  █  █  █  █  █  █
Mon Tue Wed Thu Fri Sat Sun
```

### Calorie Progress
```
┌──────────────┐
│     65%      │  ← Percentage of target
│   Cyan Ring  │  ← Conic gradient
└──────────────┘
Target: 1500 kcal/day
```

---

## Theme Options

### Dark Mode 🌙 (Default)
- **Background**: Deep navy/dark slate
- **Cards**: Semi-transparent with blur
- **Text**: Light white colors
- **Accents**: Purple, Pink, Cyan
- **Best for**: Night viewing, reduced eye strain

### Light Mode ☀️
- **Background**: Light gray/white
- **Cards**: Bright white
- **Text**: Dark colors
- **Accents**: Same vibrant colors
- **Best for**: Daytime, bright environments

### Toggle Button
- Located in navbar (top-right)
- Click to switch instantly
- Preference saved automatically

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit form |
| `Esc` | Close modal |
| `Tab` | Navigate form fields |

---

## Data Information

### What Gets Saved?
✅ All workouts and meals
✅ Theme preference
✅ Week selections
✅ All statistics

### What's NOT Saved?
❌ No cloud backup
❌ No user accounts
❌ No analytics tracking

### How to Clear Data
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Refresh page
4. All data deleted

---

## Tips for Success

### 🏆 Achieve a Streak
- Log activities every day
- Even light workouts count
- Consistency > Intensity

### 💪 Build Fitness Score
- Increase workout duration
- Add more exercises per day
- Track calories burned

### 📊 Improve Statistics
- Fill all 7 days with activities
- Maintain consistent meals
- Review progress weekly

### 🎯 Plan Effectively
- Use "This Week" for current week
- Plan next week in advance
- Review past weeks for patterns

---

## Common Tasks

### Check Daily Progress
1. Navigate to **Dashboard**
2. View stat cards
3. See quick stats below

### View Weekly Summary
1. Open **Workout** or **Diet** tab
2. Scroll to bottom
3. See "Weekly Summary" section

### Compare Weeks
1. Open **Workout** tab
2. Change week dropdown
3. View different week's data
4. Switch back to compare

### Find Best Day
1. Go to **Statistics**
2. Check "Weekly Activity" chart
3. Tallest bar = Most active day

### Track Total Progress
1. Open **Statistics** page
2. View all metrics
3. Check consistency %
4. See best streak record

---

## Troubleshooting

### Items Not Appearing?
- ✅ Make sure you clicked "Add"
- ✅ Select correct day
- ✅ Fill all required fields
- ✅ Check browser console for errors

### Data Disappeared?
- ✅ Check if localStorage is enabled
- ✅ Not in private/incognito mode?
- ✅ Browser didn't auto-clear data?
- ✅ Try refreshing page

### Cards Look Wrong?
- ✅ Update browser
- ✅ Clear cache (Ctrl+Shift+Del)
- ✅ Try different browser
- ✅ Check screen resolution

### Page Won't Load?
- ✅ Check internet connection
- ✅ Disable browser extensions
- ✅ Clear cookies and cache
- ✅ Try incognito mode

---

## Browser Compatibility

| Browser | Status | Version |
|---------|--------|---------|
| Chrome | ✅ Full Support | Latest |
| Firefox | ✅ Full Support | Latest |
| Safari | ✅ Full Support | Latest |
| Edge | ✅ Full Support | Latest |
| Mobile Safari | ✅ Supported | iOS 12+ |
| Chrome Mobile | ✅ Supported | Latest |

---

## Performance Tips

### Faster Loading
- ✅ Clear browser cache monthly
- ✅ Disable unused extensions
- ✅ Use latest browser version
- ✅ Close unnecessary tabs

### Smoother Animations
- ✅ Enable hardware acceleration
- ✅ Reduce browser extensions
- ✅ Close heavy applications
- ✅ Restart browser if choppy

---

## Keyboard Navigation

```
Tab     → Move to next field
Shift+Tab → Move to previous field
Enter   → Submit form
Esc     → Close modal/dialog
↑/↓     → Scroll dropdown options
```

---

## Default Values

| Field | Default | Notes |
|-------|---------|-------|
| Week | This Week | Can change anytime |
| Day | Monday | Any day of week |
| Duration | - | Required, in minutes |
| Calories | - | Required, any amount |
| Meal Type | Breakfast | Lunch/Dinner/Snack option |

---

## Backup Your Data

### Export Data
```javascript
// Open console (F12) and run:
JSON.stringify(localStorage)
// Copy the output and save to a text file
```

### Import Data
```javascript
// Paste previously saved data
localStorage.setItem('workouts', 'PASTE_HERE');
localStorage.setItem('meals', 'PASTE_HERE');
// Refresh page
```

---

## Getting Help

### Check These First
1. Is the page fully loaded?
2. Are you using latest browser?
3. Is localStorage enabled?
4. Are cookies allowed?

### Check Browser Console
1. Press **F12** or **Right-click → Inspect**
2. Click **Console** tab
3. Look for error messages
4. Try the suggested solution

### Clear & Reset
1. Press **Ctrl+Shift+Del** (or **Cmd+Shift+Del** on Mac)
2. Select "All time"
3. Check all boxes
4. Click "Clear data"
5. Refresh page

---

## Feature Comparison

### vs Previous Version

| Feature | Old | New |
|---------|-----|-----|
| Weeks Support | 1 day only | 4 weeks |
| Meal Types | Generic | Breakfast/Lunch/Dinner/Snack |
| Statistics | None | Full analytics |
| Theme | Only dark | Dark + Light mode |
| UI Design | Basic | Premium/Modern |
| Cards | Simple | 3D with depth |
| Animations | Basic | Smooth transitions |
| Data Size | Small | More comprehensive |

---

## Keyboard Commands (Advanced)

```javascript
// Open Developer Tools (F12) → Console

// View all data
console.log(localStorage)

// Clear all data
localStorage.clear()

// Check specific data
console.log(JSON.parse(localStorage.workouts))

// Count total items
Object.values(JSON.parse(localStorage.workouts))
  .flatMap(w => Object.values(w).flat()).length
```

---

**Happy Tracking! 🚀**

*For best results, track consistently and review statistics weekly.*
