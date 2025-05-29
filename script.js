let userCount = 1;
let exerciseQueue = [];
let currentExerciseIndex = 0;

const form = document.getElementById("fitnessForm");
const planOutput = document.getElementById("planOutput");
const session = document.getElementById("exerciseSession");
const currentExercise = document.getElementById("currentExercise");
const nextExerciseBtn = document.getElementById("nextExercise");
const completeWorkoutBtn = document.getElementById("completeWorkout");
const alarmSound = document.getElementById("alarmSound");
const motivationSound = document.getElementById("motivationSound");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const bodyType = document.getElementById("bodyType").value;
  const goal = document.getElementById("goal").value;
  const alarmTime = document.getElementById("alarmTime").value;

  const userId = userCount.toString().padStart(4, '0');
  userCount++;

  const plan = generatePlan(bodyType, goal);
  const diet = generateDiet(bodyType, goal);
  const exercises = generateExercises(bodyType, goal);

  exerciseQueue = exercises;
  currentExerciseIndex = 0;

  planOutput.innerHTML = `
    <h2>Welcome ${name} (User #${userId})</h2>
    <p><strong>Your Plan:</strong><br>${plan}</p>
    <p><strong>Your Diet Plan:</strong><br>${diet}</p>
    <button onclick="startExerciseSession()">Start Exercise Session</button>
  `;
  planOutput.classList.remove("hidden");

  scheduleAlarm(alarmTime);
});

function generatePlan(bodyType, goal) {
  if (bodyType === "chubby") {
    if (goal === "fit") return "Cardio + Yoga + Bodyweight squats";
    if (goal === "sixpack") return "HIIT + Crunches + Mountain Climbers";
    if (goal === "bodybuilder") return "Push-ups + Squats + Dips (4 sets each)";
  }
  if (bodyType === "slim") {
    if (goal === "fit") return "Stretching + Plank + Light Cardio";
    if (goal === "sixpack") return "Crunches + Russian Twists + Leg Raises";
    if (goal === "bodybuilder") return "Push-ups + Pull-ups + Lunges (3 sets each)";
  }
  if (bodyType === "bulk") {
    if (goal === "fit") return "Walking + Light Core Work";
    if (goal === "sixpack") return "HIIT + Burpees + Leg Raises";
    if (goal === "bodybuilder") return "Push-ups + Pike Push-ups + Planks (5 sets)";
  }
  return "Basic Exercise Routine";
}

function generateDiet(bodyType, goal) {
  if (goal === "fit") return "Balanced meals, low sugar, high fiber, fruits and lean protein.";
  if (goal === "sixpack") return "High protein, low carb, avoid sugar, drink plenty of water.";
  if (goal === "bodybuilder") return "High protein, moderate carbs, healthy fats, 5 meals/day.";
  return "Regular meals with moderation.";
}

function generateExercises(bodyType, goal) {
  if (goal === "fit") return ["Jumping Jacks - 1 min", "Squats - 15 reps", "Stretch - 5 min"];
  if (goal === "sixpack") return ["Crunches - 20 reps", "Plank - 1 min", "Mountain Climbers - 1 min"];
  if (goal === "bodybuilder") return ["Push-ups - 20 reps", "Dips - 15 reps", "Lunges - 20 reps"];
  return ["Walking - 10 min", "Basic Stretching - 5 min"];
}

function scheduleAlarm(timeStr) {
  const now = new Date();
  const [hour, minute] = timeStr.split(":").map(Number);
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

  if (alarmTime < now) alarmTime.setDate(alarmTime.getDate() + 1);
  const timeout = alarmTime.getTime() - now.getTime();

  setTimeout(() => {
    alarmSound.play();
    alert("🔔 Time to workout! Let's go!");
  }, timeout);
}

function startExerciseSession() {
  planOutput.classList.add("hidden");
  session.classList.remove("hidden");
  currentExercise.innerText = exerciseQueue[currentExerciseIndex];
}

nextExerciseBtn.addEventListener("click", () => {
  currentExerciseIndex++;
  if (currentExerciseIndex < exerciseQueue.length) {
    currentExercise.innerText = exerciseQueue[currentExerciseIndex];
    motivationSound.play();
    alert("🔥 Keep going! You're doing great!");
  } else {
    alert("✅ All exercises done! Click complete to finish.");
  }
});

completeWorkoutBtn.addEventListener("click", () => {
  alert("🎉 Congratulations! You finished today's workout!");
  session.classList.add("hidden");
});