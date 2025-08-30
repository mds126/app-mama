// ===== Quiz Verbes irréguliers — version optimisée (sans import JSON) =====
(() => {
  // Persistent keys
  const STORE_KEY = 'irv_state_v2';

  // Full verb list hard-coded here
  const verbs = [
    { infinitive: 'arise', past: 'arose', past_participle: 'arisen', fr: 'survenir' },
    { infinitive: 'awake', past: 'awoke', past_participle: 'awoken', fr: 'se réveiller' },
    { infinitive: 'be', past: 'was/were', past_participle: 'been', fr: 'être' },
    { infinitive: 'bear', past: 'bore', past_participle: 'borne', fr: 'supporter / porter' },
    { infinitive: 'beat', past: 'beat', past_participle: 'beaten', fr: 'battre' },
    { infinitive: 'become', past: 'became', past_participle: 'become', fr: 'devenir' },
    { infinitive: 'begin', past: 'began', past_participle: 'begun', fr: 'commencer' },
    { infinitive: 'break', past: 'broke', past_participle: 'broken', fr: 'casser' },
    { infinitive: 'bring', past: 'brought', past_participle: 'brought', fr: 'apporter' },
    { infinitive: 'buy', past: 'bought', past_participle: 'bought', fr: 'acheter' }
    // ➡️ Ajoute ici tous les autres verbes dans le même format
  ];

  // State
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

  // Utility: normalize input
  const normalize = (s = '') =>
    String(s)
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');

  const splitForms = s =>
    String(s)
      .split('/')
      .map(f => normalize(f))
      .filter(Boolean);

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

  const saveState = () => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ score, attempts, revisionMode })
      );
    } catch {}
  };

  const setEnabled = on => {
    [el.validate, el.next, el.reset, el.toggle, el.past, el.pp].forEach(n => {
      n.disabled = !on;
    });
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

    [el.past, el.pp].forEach(inp => {
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onValidate();
        }
      });
    });

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

  window.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadState();
    el.toggle.checked = revisionMode;
    updateProgress();
    el.total.textContent = `Total : ${verbs.length}`;
    setEnabled(true);
    pickNewVerb();
  });
})();
