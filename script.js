// ===== Quiz Verbes Irréguliers =====

// Liste complète
const verbs = [
  {"infinitive":"arise","past":"arose","past_participle":"arisen","fr":"survenir"},
  {"infinitive":"awake","past":"awoke","past_participle":"awoken","fr":"se réveiller"},
  {"infinitive":"be","past":"was/were","past_participle":"been","fr":"être"},
  {"infinitive":"bear","past":"bore","past_participle":"borne","fr":"supporter / porter"},
  {"infinitive":"beat","past":"beat","past_participle":"beaten","fr":"battre"},
  {"infinitive":"become","past":"became","past_participle":"become","fr":"devenir"},
  {"infinitive":"begin","past":"began","past_participle":"begun","fr":"commencer"},
  {"infinitive":"bend","past":"bent","past_participle":"bent","fr":"plier"},
  {"infinitive":"bet","past":"bet","past_participle":"bet","fr":"parier"},
  {"infinitive":"bid","past":"bid","past_participle":"bid","fr":"enchérir"},
  {"infinitive":"bite","past":"bit","past_participle":"bitten","fr":"mordre"},
  {"infinitive":"bleed","past":"bled","past_participle":"bled","fr":"saigner"},
  {"infinitive":"blow","past":"blew","past_participle":"blown","fr":"souffler"},
  {"infinitive":"break","past":"broke","past_participle":"broken","fr":"casser"},
  {"infinitive":"breed","past":"bred","past_participle":"bred","fr":"élever (animaux)"},
  {"infinitive":"bring","past":"brought","past_participle":"brought","fr":"apporter"},
  {"infinitive":"broadcast","past":"broadcast","past_participle":"broadcast","fr":"diffuser"},
  {"infinitive":"build","past":"built","past_participle":"built","fr":"construire"},
  {"infinitive":"burn","past":"burnt/burned","past_participle":"burnt/burned","fr":"brûler"},
  {"infinitive":"burst","past":"burst","past_participle":"burst","fr":"éclater"},
  {"infinitive":"buy","past":"bought","past_participle":"bought","fr":"acheter"},
  {"infinitive":"cast","past":"cast","past_participle":"cast","fr":"jeter / distribuer rôles"},
  {"infinitive":"catch","past":"caught","past_participle":"caught","fr":"attraper"},
  {"infinitive":"choose","past":"chose","past_participle":"chosen","fr":"choisir"},
  {"infinitive":"cling","past":"clung","past_participle":"clung","fr":"s'accrocher"},
  {"infinitive":"come","past":"came","past_participle":"come","fr":"venir"},
  {"infinitive":"cost","past":"cost","past_participle":"cost","fr":"coûter"},
  {"infinitive":"creep","past":"crept","past_participle":"crept","fr":"ramper"},
  {"infinitive":"cut","past":"cut","past_participle":"cut","fr":"couper"},
  {"infinitive":"deal","past":"dealt","past_participle":"dealt","fr":"distribuer / traiter"},
  {"infinitive":"dig","past":"dug","past_participle":"dug","fr":"creuser"},
  {"infinitive":"do","past":"did","past_participle":"done","fr":"faire"},
  {"infinitive":"draw","past":"drew","past_participle":"drawn","fr":"dessiner / tirer"},
  {"infinitive":"dream","past":"dreamt/dreamed","past_participle":"dreamt/dreamed","fr":"rêver"},
  {"infinitive":"drink","past":"drank","past_participle":"drunk","fr":"boire"},
  {"infinitive":"drive","past":"drove","past_participle":"driven","fr":"conduire"},
  {"infinitive":"eat","past":"ate","past_participle":"eaten","fr":"manger"},
  {"infinitive":"fall","past":"fell","past_participle":"fallen","fr":"tomber"},
  {"infinitive":"feed","past":"fed","past_participle":"fed","fr":"nourrir"},
  {"infinitive":"feel","past":"felt","past_participle":"felt","fr":"ressentir"},
  {"infinitive":"fight","past":"fought","past_participle":"fought","fr":"se battre"},
  {"infinitive":"find","past":"found","past_participle":"found","fr":"trouver"},
  {"infinitive":"fit","past":"fit/fitted","past_participle":"fit/fitted","fr":"ajuster / convenir"},
  {"infinitive":"fly","past":"flew","past_participle":"flown","fr":"voler (air)"},
  {"infinitive":"forbid","past":"forbade","past_participle":"forbidden","fr":"interdire"},
  {"infinitive":"forget","past":"forgot","past_participle":"forgotten","fr":"oublier"},
  {"infinitive":"forgive","past":"forgave","past_participle":"forgiven","fr":"pardonner"},
  {"infinitive":"freeze","past":"froze","past_participle":"frozen","fr":"geler"},
  {"infinitive":"get","past":"got","past_participle":"got/gotten","fr":"obtenir / devenir"},
  {"infinitive":"give","past":"gave","past_participle":"given","fr":"donner"},
  {"infinitive":"go","past":"went","past_participle":"gone","fr":"aller"},
  {"infinitive":"grind","past":"ground","past_participle":"ground","fr":"moudre"},
  {"infinitive":"grow","past":"grew","past_participle":"grown","fr":"grandir / cultiver"},
  {"infinitive":"hang","past":"hung","past_participle":"hung","fr":"pendre / accrocher"},
  {"infinitive":"have","past":"had","past_participle":"had","fr":"avoir"},
  {"infinitive":"hear","past":"heard","past_participle":"heard","fr":"entendre"},
  {"infinitive":"hide","past":"hid","past_participle":"hidden","fr":"cacher"},
  {"infinitive":"hit","past":"hit","past_participle":"hit","fr":"frapper"},
  {"infinitive":"hold","past":"held","past_participle":"held","fr":"tenir"},
  {"infinitive":"hurt","past":"hurt","past_participle":"hurt","fr":"blesser"},
  {"infinitive":"keep","past":"kept","past_participle":"kept","fr":"garder"},
  {"infinitive":"kneel","past":"knelt/kneeled","past_participle":"knelt/kneeled","fr":"s'agenouiller"},
  {"infinitive":"knit","past":"knit/knitted","past_participle":"knit/knitted","fr":"tricoter"},
  {"infinitive":"know","past":"knew","past_participle":"known","fr":"savoir / connaître"},
  {"infinitive":"lay","past":"laid","past_participle":"laid","fr":"poser / pondre"},
  {"infinitive":"lead","past":"led","past_participle":"led","fr":"mener / conduire"},
  {"infinitive":"lean","past":"leant/leaned","past_participle":"leant/leaned","fr":"se pencher"},
  {"infinitive":"leap","past":"leapt/leaped","past_participle":"leapt/leaped","fr":"bondir"},
  {"infinitive":"learn","past":"learnt/learned","past_participle":"learnt/learned","fr":"apprendre"},
  {"infinitive":"leave","past":"left","past_participle":"left","fr":"quitter / laisser"},
  {"infinitive":"lend","past":"lent","past_participle":"lent","fr":"prêter"},
  {"infinitive":"let","past":"let","past_participle":"let","fr":"laisser / permettre"},
  {"infinitive":"lie","past":"lay","past_participle":"lain","fr":"être couché"},
  {"infinitive":"light","past":"lit/lighted","past_participle":"lit/lighted","fr":"allumer"},
  ];

let currentVerb = null;
let score = 0;
let attempts = 0;
let revisionMode = false;

const el = id => document.getElementById(id);
const $past = el('past');
const $pp = el('participle');
const $feedback = el('feedback');

function pickNewVerb() {
  const randomIndex = Math.floor(Math.random() * verbs.length);
  currentVerb = verbs[randomIndex];

  el('base-verb').textContent = currentVerb.infinitive;
  el('french-translation').textContent = currentVerb.fr;

  if (revisionMode) {
    // On montre les réponses directement
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
    // On passe direct au suivant
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

window.addEventListener('load', () => {
  pickNewVerb();
  updateProgress();
});
