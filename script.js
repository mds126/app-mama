// ===== Quiz Verbes Irréguliers =====

(() => {
  // State
  let verbs = [];
  let currentVerb = null;
  let score = 0;
  let attempts = 0;
  let revisionMode = false;

  // Helpers
  const el = id => document.getElementById(id);
  const $past = el('past');
  const $pp = el('participle');
  const $feedback = el('feedback');

  // Init after DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    bindUI();
    loadVerbs();
    wireShortcuts();
  });

  // Load JSON data
  function loadVerbs() {
    setLoading(true);
    fetch('irregular_verbs.json')
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('JSON invalide: pas un tableau');
        verbs = data.filter(v => v && v.infinitive && (v.past || v.past === '') && v.past_participle);
        el('total-count').textContent = `Total: ${verbs.length}`;
        if (verbs.length === 0) throw new Error('Aucun verbe chargé');
        enableControls(true);
        pickNewVerb();
        updateProgress();
      })
      .catch(err => {
        console.error(err);
        setFeedback('Erreur de chargement de la liste. Vérifiez le fichier irregular_verbs.json.', 'incorrect');
        enableControls(false);
      })
      .finally(() => setLoading(false));
  }

  // UI bindings
  function bindUI() {
    el('validateBtn').addEventListener('click', onValidate);
    el('newBtn').addEventListener('click', pickNewVerb);
    el('resetBtn').addEventListener('click', onReset);
    el('revisionToggle').addEventListener('change', e => {
      revisionMode = e.target.checked;
      pickNewVerb();
      updateProgress();
    });

    // Enter to validate
    [$past, $pp].forEach(inp => {
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          el('validateBtn').click();
        }
      });
    });
  }

  function wireShortcuts() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        el('newBtn').click();
      }
      if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        el('resetBtn').click();
      }
    });
  }

  // Core logic
  function pickNewVerb() {
    if (!verbs.length) return;
    const i = Math.floor(Math.random() * verbs.length);
    currentVerb = verbs[i];

    el('base-verb').classList.remove('skeleton');
    el('french-translation').classList.remove('skeleton');

    el('base-verb')..textContent = currentVerb.infinitive;
    el('french-translation').textContent = currentVerb.fr || '—';

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
    $past.focus();
  }

  function onValidate() {
    if (!currentVerb) return;

    if (revisionMode) {
      pickNewVerb();
      return;
    }

    const pastInput = normalize($past.value);
    const ppInput = normalize($pp.value);

    if (!pastInput || !ppInput) {
      setFeedback('Veuillez remplir les deux champs.', 'incorrect');
      return;
    }

    attempts++;

    const okPast = matchesForm(pastInput, currentVerb.past);
    const okPP = matchesForm(ppInput, currentVerb.past_participle);
    const isCorrect = okPast && okPP;

    if (isCorrect) {
      score++;
      setFeedback('Correct ! ✔', 'correct');
      setFieldStatus($past, true);
      setFieldStatus($pp, true);
    } else {
      setFeedback(`Incorrect... Les réponses étaient : ${currentVerb.past} / ${currentVerb.past_participle}`, 'incorrect');
      setFieldStatus($past, okPast);
      setFieldStatus($pp, okPP);
    }

    updateProgress();
  }

  function onReset() {
    score = 0;
    attempts = 0;
    updateProgress();
    pickNewVerb();
    clearFieldStatus();
    setFeedback('Score réinitialisé.', 'note');
  }

  // Utils
  function matchesForm(input, correct) {
    if (!correct) return false;
    const forms = correct
      .toLowerCase()
      .split('/')
      .map(f => normalize(f));
    return forms.includes(normalize(input));
  }

  function normalize(s = '') {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  function updateProgress() {
    if (revisionMode) {
      el('progress-text').textContent = 'Mode révision — pas de score';
      el('progress-bar').style.width = '0%';
      return;
    }
    const percent = attempts ? Math.round((score / attempts) * 100) : 0;
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

  function enableControls(enabled) {
    ['validateBtn','newBtn','resetBtn','revisionToggle'].forEach(id => {
      const node = el(id);
      node.disabled = !enabled;
    });
    [$past,$pp].forEach(i => i.disabled = !enabled);
  }

  function setLoading(isLoading) {
    const verbEl = el('base-verb');
    const frEl = el('french-translation');
    if (isLoading) {
      verbEl.classList.add('skeleton');
      frEl.classList.add('skeleton');
    } else {
      verbEl.classList.remove('skeleton');
      frEl.classList.remove('skeleton');
    }
  }
})();
