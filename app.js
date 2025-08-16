const verbs = [
  { infinitive: "arise", past: "arose", past_participle: "arisen", fr: "survenir" },
  { infinitive: "awake", past: "awoke", past_participle: "awoken", fr: "se réveiller" },
  { infinitive: "be", past: "was/were", past_participle: "been", fr: "être" },
  { infinitive: "beat", past: "beat", past_participle: "beaten", fr: "battre" },
  { infinitive: "become", past: "became", past_participle: "become", fr: "devenir" },
  { infinitive: "begin", past: "began", past_participle: "begun", fr: "commencer" },
  { infinitive: "bend", past: "bent", past_participle: "bent", fr: "plier" },
  { infinitive: "bet", past: "bet", past_participle: "bet", fr: "parier" },
  { infinitive: "bite", past: "bit", past_participle: "bitten", fr: "mordre" },
  { infinitive: "blow", past: "blew", past_participle: "blown", fr: "souffler" }
];

let currentVerb = null;
let score = 0;
let attempts = 0;
let revisionMode = false;

function pickNewVerb() {
  const randomIndex = Math.floor(Math.random() * verbs.length);
  currentVerb = verbs[randomIndex];

  document.getElementById("base-verb").textContent = currentVerb.infinitive;
  document.getElementById("french-translation").textContent = currentVerb.fr;
  document.getElementById("past").value = "";
  document.getElementById("participle").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "feedback";
}

function matchesForm(input, correct) {
  return correct
    .toLowerCase()
    .split("/")
    .some((form) => form.trim() === input.toLowerCase());
}

function updateProgress() {
  const percent = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  document.getElementById("progress-text").textContent = revisionMode
    ? "Mode révision — pas de score"
    : `${score} / ${attempts} (${percent}%)`;
  document.getElementById("progress-bar").style.width = revisionMode
    ? "0%"
    : percent + "%";
}

document.getElementById("validateBtn").addEventListener("click", () => {
  if (!currentVerb) return;

  const pastInput = document.getElementById("past").value.trim();
  const ppInput = document.getElementById("participle").value.trim();

  if (revisionMode) {
    document.getElementById("past").value = currentVerb.past;
    document.getElementById("participle").value = currentVerb.past_participle;
    document.getElementById("feedback").textContent =
      `Révision : ${currentVerb.past} / ${currentVerb.past_participle}`;
    document.getElementById("feedback").className = "feedback correct";
    return
