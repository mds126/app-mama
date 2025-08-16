// ===== Irregular Verbs Quiz Logic =====

// Your quiz data — you can expand this list
const verbs = [
  { base: "be", past: ["was", "were"], participle: ["been"], french: "être" },
  { base: "become", past: ["became"], participle: ["become"], french: "devenir" },
  { base: "begin", past: ["began"], participle: ["begun"], french: "commencer" },
  { base: "break", past: ["broke"], participle: ["broken"], french: "casser" },
  { base: "bring", past: ["brought"], participle: ["brought"], french: "apporter" },
  // ... add more as needed
];

let currentVerb = null;
let answeredCount = 0;
let totalCount = 0;
let revisionMode = false;

// Elements
const baseVerbEl = document.getElementById("base-verb");
const frenchEl = document.getElementById("french-translation");
const pastInput = document.getElementById("past");
const partInput = document.getElementById("participle");
const feedbackEl = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const validateBtn = document.getElementById("validateBtn");
const newBtn = document.getElementById("newBtn");
const resetBtn = document.getElementById("resetBtn");
const revisionToggle = document.getElementById("revisionToggle");

function pickRandomVerb() {
  const pool = revisionMode && currentVerb ? [currentVerb] : verbs;
  return pool[Math.floor(Math.random() * pool.length)];
}

function showVerb() {
  currentVerb = pickRandomVerb();
  baseVerbEl.textContent = currentVerb.base;
  frenchEl.textContent = revisionMode ? currentVerb.french : "—";
  pastInput.value = "";
  partInput.value = "";
  feedbackEl.textContent = "";
}

function updateProgress() {
  const percent = totalCount ? Math.round((answeredCount / totalCount) * 100) : 0;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${answeredCount} / ${totalCount} (${percent}%)`;
}

function checkAnswer() {
  totalCount++;
  const pastAnswer = pastInput.value.trim().toLowerCase();
  const partAnswer = partInput.value.trim().toLowerCase();

  const pastCorrect = currentVerb.past.includes(pastAnswer);
  const partCorrect = currentVerb.participle.includes(partAnswer);

  if (pastCorrect && partCorrect) {
    answeredCount++;
    feedbackEl.textContent = "✅ Correct !";
    feedbackEl.style.color = "green";
  } else {
    const correctPast = currentVerb.past.join(" / ");
    const correctPart = currentVerb.participle.join(" / ");
    feedbackEl.innerHTML = `❌ Faux<br>
      Prétérit: ${correctPast}<br>
      Participe passé: ${correctPart}`;
    feedbackEl.style.color = "red";
  }
  updateProgress();
}

function resetQuiz() {
  answeredCount = 0;
  totalCount = 0;
  updateProgress();
  showVerb();
}

// Event listeners
validateBtn.addEventListener("click", checkAnswer);
newBtn.addEventListener("click", showVerb);
resetBtn.addEventListener("click", resetQuiz);
revisionToggle.addEventListener("change", (e) => {
  revisionMode = e.target.checked;
  showVerb();
});

// Initialize
resetQuiz();
