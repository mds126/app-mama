// ===== Quiz Verbes irréguliers — version optimisée =====
(() => {
  // Persistent keys
  const STORE_KEY = 'irv_state_v2';
  const JSON_URL = 'irregular_verbs.json?v=2'; // cache-busting on updates

  // State
  let verbs = [];
  let currentIndex = -1;
  let score = 0;
  let attempts = 0;
  let revisionMode = false;

  // Cache DOM
  const $ = id => document.getElementById(id);
  const el = {
    base: $('base-verb'),
    fr: $('french-translation'),
    past: $('past'),
    pp: $('participle'),
    feedback: $('feedback'),
    bar: $('progress-bar'),
    text: $('progress-text'),
    total: $('total-count'),
    validate: $('validateBtn'),
    next: $('newBtn'),
    reset: $('resetBtn'),
    toggle: $('revisionToggle'),
  };

  // Utility: normalize input (lowercase, trim, collapse spaces, remove diacritics)
  const normalize = (s = '') =>
    String(s)
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');

  // Utility: split "a/b/c" forms to array
  const splitForms = s =>
    String(s)
      .split('/')
      .map(f => normalize(f))
      .filter(Boolean);

  // Matches user input against slash-separated forms
  const matches = (user, canon) => splitForms(canon).includes(normalize(user));

  // Load from localStorage
  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      score = Number(data.score) || 0;
      attempts = Number(data.attempts) || 0;
      revisionMode = !!data.revisionMode;
    } catch {}
  };

  // Save to localStorage
  const saveState = () => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ score, attempts, revisionMode })
      );
    } catch {}
  };

  // Enable/disable controls atomically
  const setEnabled = on => {
    [el.validate, el.next, el.reset, el.toggle, el.past, el.pp].forEach(n => {
      n.disabled = !on;
    });
  };

  const setSkeleton = on => {
    [el.base, el.fr].forEach(n => n.classList.toggle('skeleton', on));
  };

  const setFeedback = (text = '', kind = '') => {
    el.feedback.textContent = text;
    el.feedback.className = 'feedback' + (kind ? ' ' + kind : '');
  };

  const setFieldState = (input, ok) => {
    input.classList.remove('ok', 'ko');
    if (ok === true) input.classList.add('ok');
    if (ok === false) input.classList.add('ko');
  };

  const clearFieldStates = () => {
    setFieldState(el.past, undefined);
    setFieldState(el.pp, undefined);
  };

  const updateProgress = () => {
    if (revisionMode) {
      el.text.textContent = 'Mode révision — pas de score';
      el.bar.style.width = '0%';
      return;
    }
    const pct = attempts ? Math.round((score / attempts) * 100) : 0;
    el.text.textContent = `${score} / ${attempts} (${pct}%)`;
    el.bar.style.width = pct + '%';
  };

  // Pick a new verb (avoid immediate repeat)
  const pickNewVerb = () => {
    if (!verbs.length) return;

    let nextIndex;
    if (verbs.length === 1) {
      nextIndex = 0;
    } else {
      do {
        nextIndex = Math.floor(Math.random() * verbs.length);
      } while (nextIndex === currentIndex);
    }
    currentIndex = nextIndex;
    const v = verbs[currentIndex];

    el.base.classList.remove('skeleton');
    el.fr.classList.remove('skeleton');

    el.base.textContent = v.infinitive;
    el.fr.textContent = v.fr || '—';

    if (revisionMode) {
      el.past.value = v.past;
      el.pp.value = v.past_participle;
      el.past.readOnly = true;
      el.pp.readOnly = true;
      setFeedback(`📚 Révision : ${v.past} / ${v.past_participle}`, 'note');
    } else {
      el.past.value = '';
      el.pp.value = '';
      el.past.readOnly = false;
      el.pp.readOnly = false;
      setFeedback('', '');
    }

    clearFieldStates();
    if (!revisionMode) el.past.focus();
  };

  // Validate current answers
  const onValidate = () => {
    if (revisionMode) {
      pickNewVerb();
      return;
    }
    const v = verbs[currentIndex];
    if (!v) return;

    const userPast = el.past.value;
    const userPP = el.pp.value;

    if (!normalize(userPast) || !normalize(userPP)) {
      setFeedback('Veuillez remplir les deux champs.', 'incorrect');
      return;
    }

    attempts++;
    const okPast = matches(userPast, v.past);
    const okPP = matches(userPP, v.past_participle);
    const ok = okPast && okPP;

    if (ok) {
      score++;
      setFeedback('Correct ! ✔', 'correct');
    } else {
      setFeedback(
        `Incorrect… Réponses : ${v.past} / ${v.past_participle}`,
        'incorrect'
      );
    }

    setFieldState(el.past, okPast);
    setFieldState(el.pp, okPP);
    updateProgress();
    saveState();
  };

  const onReset = () => {
    score = 0;
    attempts = 0;
    updateProgress();
    clearFieldStates();
    setFeedback('Score réinitialisé.', 'note');
    saveState();
    pickNewVerb();
  };

  // Fetch verbs JSON with graceful fallback
  const loadVerbs = async () => {
    setEnabled(false);
    setSkeleton(true);
    setFeedback('Chargement…', 'note');
    try {
      const res = await fetch(JSON_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Format JSON invalide');
      // Validate and keep only entries with required fields
      verbs = data.filter(
        v => v && v.infinitive && v.past && v.past_participle
      );
      if (!verbs.length) throw new Error('Aucun verbe valide trouvé');
      el.total.textContent = `Total : ${verbs.length}`;
      setFeedback('', '');
      setEnabled(true);
      pickNewVerb();
    } catch (e) {
      console.error(e);
      // Minimal fallback data so UI remains usable
      verbs = [
        { infinitive: 'be', past: 'was/were', past_participle: 'been', fr: 'être' },
        { infinitive: 'go', past: 'went', past_participle: 'gone', fr: 'aller' },
        { infinitive: 'write', past: 'wrote', past_participle: 'written', fr: 'écrire' }
      ];
      el.total.textContent = `Total : ${verbs.length} (fallback)`;
      setFeedback(
        "Impossible de charger irregular_verbs.json. Utilisation d'un jeu minimal.",
        'note'
      );
      setEnabled(true);
      pickNewVerb();
    } finally {
      setSkeleton(false);
      updateProgress();
    }
  };

  // Wire events
  const bindEvents = () => {
    el.validate.addEventListener('click', onValidate, { passive: true });
    el.next.addEventListener('click', pickNewVerb, { passive: true });
    el.reset.addEventListener('click', onReset, { passive: true });

    el.toggle.addEventListener('change', e => {
      revisionMode = e.target.checked;
      saveState();
      pickNewVerb();
      updateProgress();
    });

    // Enter to validate
    [el.past, el.pp].forEach(inp => {
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onValidate();
        }
      });
    });

    // Shortcuts
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        pickNewVerb();
      }
      if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        onReset();
      }
    });
  };

  // Boot
  window.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadState();
    el.toggle.checked = revisionMode;
    updateProgress(); // reflect restored state early
    loadVerbs();
  });
})();
