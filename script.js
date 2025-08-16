// ===== Quiz Verbes Irréguliers =====

let verbs = [];
let currentVerb = null;
let score = 0;
let attempts = 0;
let revisionMode = false;

const el = id => document.getElementById(id);
const $past = el('past');
const $pp = el('participle');
const $feedback = el('feedback');

// Charger la liste depuis un fichier JSON
fetch('irregular_verbs.json')
  .then(res => res.json())
  .then(data => {
    verbs = data;
    pickNewVerb();
    updateProgress();
  })
  .catch(err => console.error('Erreur chargement JSON', err));

function pickNewVerb() {
  if (!verbs.length) return;
  const randomIndex = Math.floor(Math.random() * verbs.length);
  currentVerb = verbs[randomIndex];

  el('base-verb').textContent = currentVerb.infinitive;
  el('french-translation').textContent = currentVerb.fr;

  if (revisionMode) {
    $past.value = currentVerb.past;
    $pp.value = currentVerb.past_participle;
    setFeedback(`📚 Révision : ${currentVerb.past} / ${currentVerb.past_participle}`, 'note');
  } else {
    $past.value = '';
    $pp.value = '';
    setFeedback('', '');
  }
  clearFieldStatus();
}

function matchesForm(input, correct) {
  if (!correct) return false;
  const user = input.trim().toLowerCase();
  return correct
    .toLowerCase()
    .split('/')
    .some(form => form.trim() === user);
}

function updateProgress() {
  if (revisionMode) {
    el('progress-text').textContent = 'Mode révision — pas de score';
    el('progress-bar').style.width = '0%';
    return;
  }
  const percent = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  el('progress-text').textContent = `${score} / ${attempts} (${percent}%)`;
  el('progress-bar').style.width = percent + '%';
}

function setFieldStatus(inputEl, ok) {
  inputEl.classList.remove('ok', 'ko');
  if (ok === true) inputEl.classList.add('ok');
  if (ok === false) inputEl.classList.add('ko');
}
function clearFieldStatus() {
  $past.classList.remove('ok', 'ko');
  $pp.classList.remove('ok', 'ko');
}

function setFeedback(text, kind) {
  $feedback.textContent = text || '';
  $feedback.className = 'feedback' + (kind ? ' ' + kind : '');
}

el('validateBtn').addEventListener('click', () => {
  if (!currentVerb) return;

  const pastInput = $past.value.trim();
  const ppInput = $pp.value.trim();

  if (revisionMode) {
    pickNewVerb();
    return;
  }

  if (!pastInput || !ppInput) {
    setFeedback('Veuillez remplir les deux champs.', 'incorrect');
    return;
  }

  attempts++;

  const isCorrect =
    matchesForm(pastInput, currentVerb.past) &&
    matchesForm(ppInput, currentVerb.past_participle);

  if (isCorrect) {
    score++;
    setFeedback('Correct ! ✔', 'correct');
    setFieldStatus($past, true);
    setFieldStatus($pp, true);
  } else {
    setFeedback(`Incorrect... Les réponses étaient : ${currentVerb.past} / ${currentVerb.past_participle}`, 'incorrect');
    setFieldStatus($past, matchesForm(pastInput, currentVerb.past));
    setFieldStatus($pp, matchesForm(ppInput, currentVerb.past_participle));
  }

  updateProgress();
});

el('newBtn').addEventListener('click', () => {
  pickNewVerb();
});

el('resetBtn').addEventListener('click', () => {
  score = 0;
  attempts = 0;
  updateProgress();
  pickNewVerb();
});

el('revisionToggle').addEventListener('change', e => {
  revisionMode = e.target.checked;
  pickNewVerb();
  updateProgress();
});
