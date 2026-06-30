/* ============================================================
   STRATEGY FLOW  —  IIFE module
   Steps: 1=Priorities  2=Goal  3=Positioning  4=Summary
   ============================================================ */
var StrategyFlow = (function () {
  var state;

  var SP_STEPS = ['Priorities', 'Goal', 'Positioning', 'Summary'];

  var SP_PRIORITIES = [
    { id: 'customers',  name: 'Get more customers',      icon: spIconCustomers()  },
    { id: 'launch',     name: 'Launch a new product',    icon: spIconLaunch()     },
    { id: 'online',     name: 'Get found online',        icon: spIconOnline()     },
    { id: 'community',  name: 'Build a loyal community', icon: spIconCommunity()  },
    { id: 'repeat',     name: 'Increase repeat orders',  icon: spIconRepeat()     },
    { id: 'idea',       name: 'Test a new idea',         icon: spIconIdea()       }
  ];

  /* ---- SVG icons ---- */
  function spIconCustomers() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>'
      + '<circle cx="9" cy="7" r="4"/>'
      + '<path d="M23 21v-2a4 4 0 00-3-3.87"/>'
      + '<path d="M16 3.13a4 4 0 010 7.75"/>'
      + '</svg>';
  }
  function spIconLaunch() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M12 2L12 2C12 2 19 6 19 12C19 18 12 22 12 22C12 22 5 18 5 12C5 6 12 2 12 2Z" stroke="none"/>'
      + '<path d="M4.5 16.5L2 22l5.5-2.5"/>'
      + '<path d="M22 2L11 13"/>'
      + '<path d="M13 2H22V11"/>'
      + '</svg>';
  }
  function spIconOnline() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<circle cx="11" cy="11" r="8"/>'
      + '<line x1="21" y1="21" x2="16.65" y2="16.65"/>'
      + '</svg>';
  }
  function spIconCommunity() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>'
      + '</svg>';
  }
  function spIconRepeat() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<polyline points="17 1 21 5 17 9"/>'
      + '<path d="M3 11V9a4 4 0 014-4h14"/>'
      + '<polyline points="7 23 3 19 7 15"/>'
      + '<path d="M21 13v2a4 4 0 01-4 4H3"/>'
      + '</svg>';
  }
  function spIconIdea() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<line x1="12" y1="2" x2="12" y2="6"/>'
      + '<line x1="12" y1="18" x2="12" y2="22"/>'
      + '<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>'
      + '<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>'
      + '<line x1="2" y1="12" x2="6" y2="12"/>'
      + '<line x1="18" y1="12" x2="22" y2="12"/>'
      + '<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>'
      + '<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>'
      + '</svg>';
  }

  /* ---- init ---- */
  function init(s) {
    state = s;
    if (!state.strategyFlow) {
      state.strategyFlow = { step: 1 };
    }
    if (!state.strategy) {
      state.strategy = { priorities: [], goal: '', positioning: '' };
    }
  }

  /* ---- Helper: get flow sub-state ---- */
  function spFlow() {
    if (!state.strategyFlow) state.strategyFlow = { step: 1 };
    return state.strategyFlow;
  }

  /* ---- Stepper (reuses wizard-steps / wiz-dot / wiz-label / wiz-line) ---- */
  function spStepper() {
    var step = spFlow().step;
    var html = '<div class="cf-stepper-wrap"><div class="wizard-steps">';
    SP_STEPS.forEach(function (label, i) {
      var n = i + 1;
      var cls = n < step ? 'done' : (n === step ? 'active' : 'pending');
      html += '<div class="wizard-step" style="flex-direction:column;align-items:center;">'
        + '<div class="wiz-dot ' + cls + '">' + (n < step ? '&#10003;' : n) + '</div>'
        + '<div class="wiz-label">' + label + '</div>'
        + '</div>';
      if (i < SP_STEPS.length - 1) {
        html += '<div class="wiz-line' + (n < step ? ' done' : '') + '"></div>';
      }
    });
    return html + '</div></div>';
  }

  /* ---- Validate whether the current step allows continuing ---- */
  function spCanContinue() {
    var f = spFlow();
    var s = state.strategy;
    if (f.step === 1) return s.priorities && s.priorities.length > 0;
    if (f.step === 2) return !!(s.goal && s.goal.trim());
    if (f.step === 3) return true;
    return false;
  }

  /* ============================================================
     Step 1 — Priorities (multi-select card grid)
     ============================================================ */
  function spStepPriorities() {
    var biz = state.business || {};
    var contextText = (biz.description && biz.description.trim())
      ? biz.description.trim()
      : (biz.name && biz.name.trim()) ? biz.name.trim() : 'Your business';

    var bizIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      + '<rect x="2" y="7" width="20" height="14" rx="2"/>'
      + '<path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>'
      + '</svg>';

    var refCard = '<div class="sp-ref-card">'
      + '<div class="sp-ref-icon">' + bizIcon + '</div>'
      + '<div><div class="sp-ref-label">You told us</div>'
      + '<div class="sp-ref-value">' + contextText + '</div></div>'
      + '</div>';

    var selected = state.strategy.priorities || [];
    var tilesHtml = SP_PRIORITIES.map(function (p) {
      var sel = selected.indexOf(p.id) !== -1;
      return '<div class="sp-priority-tile' + (sel ? ' selected' : '') + '" onclick="spTogglePriority(\'' + p.id + '\')">'
        + '<div class="sp-priority-icon">' + p.icon + '</div>'
        + (sel ? '<div class="sp-priority-check">&#10003;</div>' : '')
        + '<div class="sp-priority-name">' + p.name + '</div>'
        + '</div>';
    }).join('');

    return '<div class="sp-step-wrap">'
      + '<div class="cf-step-title">What are your main priorities?</div>'
      + '<div class="cf-step-sub">Select everything that applies — your strategy will be shaped around these goals.</div>'
      + refCard
      + '<div class="sp-priority-grid">' + tilesHtml + '</div>'
      + '<div class="sp-select-hint">Select at least one to continue.</div>'
      + '</div>';
  }

  /* ============================================================
     Step 2 — 90-Day Goal
     ============================================================ */
  function spStepGoal() {
    var goalVal = (state.strategy.goal || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return '<div class="sp-step-wrap">'
      + '<div class="cf-step-title">Your 90-day goal</div>'
      + '<div class="cf-step-sub">What does success look like for your business over the next three months?</div>'
      + '<div class="sp-field">'
      + '<label>What\'s your top goal for the next 90 days?</label>'
      + '<textarea id="sp-goal-input" rows="5"'
      + ' placeholder="Reach 150 regular customers and launch a holiday gift box collection."'
      + ' oninput="spGoalInput(this.value)">' + goalVal + '</textarea>'
      + '</div>'
      + '<div class="sp-field-hint">Be specific — a clear goal helps Clarity build a more targeted content strategy.</div>'
      + '</div>';
  }

  /* ============================================================
     Step 3 — Positioning
     ============================================================ */
  function spStepPositioning() {
    var posVal = (state.strategy.positioning || '').replace(/"/g, '&quot;');
    return '<div class="sp-step-wrap">'
      + '<div class="cf-step-title">What makes you different?</div>'
      + '<div class="cf-step-sub">Your positioning helps Clarity write content that highlights your competitive edge.</div>'
      + '<div class="sp-field">'
      + '<label>What makes you different from competitors?'
      + ' <span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:10px;">(optional)</span></label>'
      + '<input type="text" id="sp-pos-input"'
      + ' value="' + posVal + '"'
      + ' placeholder="Locally made, fresh daily, no preservatives."'
      + ' oninput="spPositioningInput(this.value)" />'
      + '</div>'
      + '<div class="sp-field-hint">Leave blank to skip — you can always add this later.</div>'
      + '</div>';
  }

  /* ============================================================
     Step 4 — Summary
     ============================================================ */
  function spStepSummary() {
    var s = state.strategy;

    /* Priorities section */
    var priorityNames = SP_PRIORITIES.filter(function (p) {
      return (s.priorities || []).indexOf(p.id) !== -1;
    }).map(function (p) { return p.name; });

    var chipsHtml = priorityNames.length
      ? priorityNames.map(function (n) {
          return '<span class="sp-summary-chip">' + n + '</span>';
        }).join('')
      : '<span class="sp-summary-empty">None selected</span>';

    /* Goal section */
    var goalHtml = (s.goal && s.goal.trim())
      ? '<div class="sp-summary-quote">&ldquo;' + s.goal.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') + '&rdquo;</div>'
      : '<div class="sp-summary-empty">Not specified</div>';

    /* Positioning section */
    var posHtml = (s.positioning && s.positioning.trim())
      ? '<div class="sp-summary-quote">&ldquo;' + s.positioning.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') + '&rdquo;</div>'
      : '<div class="sp-summary-empty">Not specified</div>';

    return '<div class="sp-step-wrap">'
      + '<div class="cf-step-title">Review your strategy</div>'
      + '<div class="cf-step-sub">Everything looks good? Hit Confirm to lock it in — you can always edit later.</div>'
      + '<div class="sp-summary-card">'

      + '<div class="sp-summary-section">'
      + '<div class="sp-summary-content">'
      + '<div class="sp-summary-label">Priorities</div>'
      + '<div class="sp-summary-chips">' + chipsHtml + '</div>'
      + '</div>'
      + '<button class="sp-summary-edit" onclick="spGoStep(1)">Edit</button>'
      + '</div>'

      + '<div class="sp-summary-section">'
      + '<div class="sp-summary-content">'
      + '<div class="sp-summary-label">90-Day Goal</div>'
      + goalHtml
      + '</div>'
      + '<button class="sp-summary-edit" onclick="spGoStep(2)">Edit</button>'
      + '</div>'

      + '<div class="sp-summary-section">'
      + '<div class="sp-summary-content">'
      + '<div class="sp-summary-label">Positioning</div>'
      + posHtml
      + '</div>'
      + '<button class="sp-summary-edit" onclick="spGoStep(3)">Edit</button>'
      + '</div>'

      + '</div>'
      + '</div>';
  }

  /* ============================================================
     Main screen renderer
     ============================================================ */
  function screenStrategyFlow() {
    var f    = spFlow();
    var step = f.step;

    var content = step === 1 ? spStepPriorities()
      : step === 2 ? spStepGoal()
      : step === 3 ? spStepPositioning()
      : spStepSummary();

    var topbar = '<div class="cf-topbar">'
      + '<div class="cf-brand">Clarity <span>Strategic Plan</span></div>'
      + '<button class="app-topbar-back" onclick="setMode(\'home\')">&#8592; Back to home</button>'
      + '</div>';

    var backDisabled = step <= 1 ? ' disabled' : '';
    var footerRight = step < 4
      ? '<button class="btn btn-primary"' + (spCanContinue() ? '' : ' disabled') + ' onclick="spContinue()">Continue &#8594;</button>'
      : '<button class="btn btn-primary" onclick="spConfirmStrategy()">Confirm strategy</button>';

    var footer = '<div class="cf-footer">'
      + '<button class="btn btn-outline"' + backDisabled + ' onclick="spBack()">&#8592; Back</button>'
      + '<div class="cf-footer-mid"><span class="cf-eta">Strategy &middot; ' + SP_STEPS.length + ' steps</span></div>'
      + footerRight
      + '</div>';

    return '<div class="cf-screen">'
      + topbar
      + '<div class="sp-body"><div class="cp-main" style="max-width:none;margin:0;padding:0;">'
      + spStepper()
      + content
      + '</div></div>'
      + footer
      + '</div>';
  }

  return { init: init, screenStrategyFlow: screenStrategyFlow };
})();

/* ---- Expose screen renderer for renderApp() ---- */
window.screenStrategyFlow = function () { return StrategyFlow.screenStrategyFlow(); };

/* ============================================================
   GLOBAL EVENT HANDLERS
   ============================================================ */

/* Step navigation */
window.spGoStep = function (step) {
  /* Capture live textarea/input values before navigating */
  spFlushLiveInputs();
  appState.strategyFlow.step = step;
  renderContent();
};

window.spBack = function () {
  var current = appState.strategyFlow.step;
  if (current > 1) {
    spFlushLiveInputs();
    appState.strategyFlow.step = current - 1;
    renderContent();
  }
};

window.spContinue = function () {
  spFlushLiveInputs();
  var step = appState.strategyFlow.step;
  if (step < 4) {
    appState.strategyFlow.step = step + 1;
    renderContent();
  }
};

window.spConfirmStrategy = function () {
  spFlushLiveInputs();
  setMode('persona-studio');
};

/* Toggle a priority on/off (multi-select) */
window.spTogglePriority = function (id) {
  var priorities = appState.strategy.priorities;
  var idx = priorities.indexOf(id);
  if (idx === -1) {
    priorities.push(id);
  } else {
    priorities.splice(idx, 1);
  }
  renderContent();
};

/* Live input persistence (no re-render to avoid losing cursor position) */
window.spGoalInput = function (val) {
  appState.strategy.goal = val;
  var btn = document.querySelector('.cf-footer .btn-primary');
  if (btn) btn.disabled = !(val && val.trim());
};

window.spPositioningInput = function (val) {
  appState.strategy.positioning = val;
};

/* Flush live text inputs to state before any navigation/re-render */
function spFlushLiveInputs() {
  var goalEl = document.getElementById('sp-goal-input');
  if (goalEl) appState.strategy.goal = goalEl.value;
  var posEl  = document.getElementById('sp-pos-input');
  if (posEl)  appState.strategy.positioning = posEl.value;
}
