// ===== Quiz Verbes irréguliers — version optimisée (sans import JSON) =====
(() => {
  // Persistent keys
  const STORE_KEY = 'irv_state_v2';

  // Full verb list hard-coded here
  const verbs =  [
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
  {"infinitive":"lose","past":"lost","past_participle":"lost","fr":"perdre"},
  {"infinitive":"make","past":"made","past_participle":"made","fr":"faire / fabriquer"},
  {"infinitive":"mean","past":"meant","past_participle":"meant","fr":"vouloir dire"},
  {"infinitive":"meet","past":"met","past_participle":"met","fr":"rencontrer"},
  {"infinitive":"mow","past":"mowed","past_participle":"mown/mowed","fr":"tondre"},
  {"infinitive":"overcome","past":"overcame","past_participle":"overcome","fr":"surmonter"},
  {"infinitive":"pay","past":"paid","past_participle":"paid","fr":"payer"},
  {"infinitive":"put","past":"put","past_participle":"put","fr":"mettre"},
  {"infinitive":"quit","past":"quit","past_participle":"quit","fr":"quitter / arrêter"},
  {"infinitive":"read","past":"read","past_participle":"read","fr":"lire"},
  {"infinitive":"ride","past":"rode","past_participle":"ridden","fr":"monter (à cheval, vélo)"},
  {"infinitive":"ring","past":"rang","past_participle":"rung","fr":"sonner"},
  {"infinitive":"rise","past":"rose","past_participle":"risen","fr":"s'élever"},
  {"infinitive":"run","past":"ran","past_participle":"run","fr":"courir"},
  {"infinitive":"saw","past":"sawed","past_participle":"sawn/sawed","fr":"scier"},
  {"infinitive":"say","past":"said","past_participle":"said","fr":"dire"},
  {"infinitive":"see","past":"saw","past_participle":"seen","fr":"voir"},
  {"infinitive":"seek","past":"sought","past_participle":"sought","fr":"chercher"},
  {"infinitive":"sell","past":"sold","past_participle":"sold","fr":"vendre"},
  {"infinitive":"send","past":"sent","past_participle":"sent","fr":"envoyer"},
  {"infinitive":"set","past":"set","past_participle":"set","fr":"placer / fixer"},
  {"infinitive":"sew","past":"sewed","past_participle":"sewn/sewed","fr":"coudre"},
  {"infinitive":"shake","past":"shook","past_participle":"shaken","fr":"secouer"},
  {"infinitive":"shear","past":"sheared","past_participle":"shorn/sheared","fr":"tondre (mouton)"},
  {"infinitive":"shine","past":"shone","past_participle":"shone","fr":"briller"},
  {"infinitive":"shoot","past":"shot","past_participle":"shot","fr":"tirer (arme)"},
  {"infinitive":"show","past":"showed","past_participle":"shown/showed","fr":"montrer"},
  {"infinitive":"shrink","past":"shrank","past_participle":"shrunk","fr":"rétrécir"},
  {"infinitive":"shut","past":"shut","past_participle":"shut","fr":"fermer"},
  {"infinitive":"sing","past":"sang","past_participle":"sung","fr":"chanter"},
  {"infinitive":"sink","past":"sank","past_participle":"sunk","fr":"couler"},
  {"infinitive":"sit","past":"sat","past_participle":"sat","fr":"s'asseoir"},
  {"infinitive":"sleep","past":"slept","past_participle":"slept","fr":"dormir"},
  {"infinitive":"slide","past":"slid","past_participle":"slid","fr":"glisser"},
  {"infinitive":"sling","past":"slung","past_participle":"slung","fr":"lancer / jeter"},
  {"infinitive":"smell","past":"smelt/smelled","past_participle":"smelt/smelled","fr":"sentir (odeur)"},
  {"infinitive":"sow","past":"sowed","past_participle":"sown/sowed","fr":"semer"},
  {"infinitive":"speak","past":"spoke","past_participle":"spoken","fr":"parler"},
  {"infinitive":"speed","past":"sped","past_participle":"sped","fr":"aller vite"},
  {"infinitive":"spell","past":"spelt/spelled","past_participle":"spelt/spelled","fr":"épeler"},
  {"infinitive":"spend","past":"spent","past_participle":"spent","fr":"dépenser / passer (temps)"},
  {"infinitive":"spill","past":"spilt/spilled","past_participle":"spilt/spilled","fr":"renverser"},
  {"infinitive":"spin","past":"spun","past_participle":"spun","fr":"filer (laine)"},
  {"infinitive":"spit","past":"spat","past_participle":"spat","fr":"cracher"},
  {"infinitive":"split","past":"split","past_participle":"split","fr":"fendre / diviser"},
  {"infinitive":"spoil","past":"spoilt/spoiled","past_participle":"spoilt/spoiled","fr":"gâcher"},
  {"infinitive":"spread","past":"spread","past_participle":"spread","fr":"répandre / étaler"},
  {"infinitive":"spring","past":"sprang","past_participle":"sprung","fr":"jaillir / bondir"},
  {"infinitive":"stand","past":"stood","past_participle":"stood","fr":"se tenir debout"},
  {"infinitive":"steal","past":"stole","past_participle":"stolen","fr":"voler (dérober)"},
  {"infinitive":"stick","past":"stuck","past_participle":"stuck","fr":"coller"},
  {"infinitive":"sting","past":"stung","past_participle":"stung","fr":"piquer"},
  {"infinitive":"stink","past":"stank","past_participle":"stunk","fr":"puer"},
  {"infinitive":"stride","past":"strode","past_participle":"stridden","fr":"marcher à grands pas"},
  {"infinitive":"strike","past":"struck","past_participle":"struck","fr":"frapper"},
  {"infinitive":"string","past":"strung","past_participle":"strung","fr":"enfiler / tendre (corde)"},
  {"infinitive":"swear","past":"swore","past_participle":"sworn","fr":"jurer"},
  {"infinitive":"sweep","past":"swept","past_participle":"swept","fr":"balayer"},
  {"infinitive":"swell","past":"swelled","past_participle":"swollen/swelled","fr":"gonfler"},
  {"infinitive":"swim","past":"swam","past_participle":"swum","fr":"nager"},
  {"infinitive":"swing","past":"swung","past_participle":"swung","fr":"se balancer"},
  {"infinitive":"take","past":"took","past_participle":"taken","fr":"prendre"},
  {"infinitive":"teach","past":"taught","past_participle":"taught","fr":"enseigner"},
  {"infinitive":"tear","past":"tore","past_participle":"torn","fr":"déchirer"},
  {"infinitive":"tell","past":"told","past_participle":"told","fr":"dire / raconter"},
  {"infinitive":"think","past":"thought","past_participle":"thought","fr":"penser"},
  {"infinitive":"thrive","past":"throve/thrived","past_participle":"thriven/thrived","fr":"prospérer"},
  {"infinitive":"throw","past":"threw","past_participle":"thrown","fr":"jeter"},
  {"infinitive":"thrust","past":"thrust","past_participle":"thrust","fr":"enfoncer / pousser"},
  {"infinitive":"tread","past":"trod","past_participle":"trodden","fr":"fouler (sol)"},
  {"infinitive":"understand","past":"understood","past_participle":"understood","fr":"comprendre"},
  {"infinitive":"undertake","past":"undertook","past_participle":"undertaken","fr":"entreprendre"},
  {"infinitive":"upset","past":"upset","past_participle":"upset","fr":"contrarier / renverser"},
  {"infinitive":"wake","past":"woke","past_participle":"woken","fr":"(se) réveiller"},
  {"infinitive":"wear","past":"wore","past_participle":"worn","fr":"porter (vêtements)"},
  {"infinitive":"weave","past":"wove","past_participle":"woven","fr":"tisser"},
  {"infinitive":"weep","past":"wept","past_participle":"wept","fr":"pleurer"},
  {"infinitive":"win","past":"won","past_participle":"won","fr":"gagner"},
  {"infinitive":"wind","past":"wound","past_participle":"wound","fr":"enrouler"},
  {"infinitive":"withdraw","past":"withdrew","past_participle":"withdrawn","fr":"retirer"},
  {"infinitive":"withstand","past":"withstood","past_participle":"withstood","fr":"résister à"},
  {"infinitive":"wring","past":"wrung","past_participle":"wrung","fr":"tordre / essorer"},
  {"infinitive":"write","past":"wrote","past_participle":"written","fr":"écrire"}
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
document.addEventListener('keydown', e => {
  if (e.altKey && (e.key === 'n' || e.key === 'N')) {
    e.preventDefault();
    pickNewVerb();
  }
  if (e.altKey && (e.key === 'r' || e.key === 'R')) {
    e.preventDefault();
    onReset();
  }
});
