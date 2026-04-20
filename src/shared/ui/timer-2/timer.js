import { addLeadingZero } from '@/shared/lib';
import { MS, DEFAULT_LANG } from './constans';
import { LABELS } from './locates';

const setText = (el, value) => {
  if (el && el.textContent !== value) {
    el.textContent = value;
  }
};

const getDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ];
};

const getTargetDate = (to) => {
  if (to instanceof Date) {
    return to;
  }
  if (typeof to === 'string') {
    return new Date(to);
  }
  if (typeof to === 'number') {
    return new Date(Date.now() + to * 1000);
  }
  throw new Error('Timer: invalid target date');
};

const getTimeRemaining = (targetDate) => {
  const total = Math.max(0, targetDate - Date.now());
  return {
    total,
    days: Math.floor(total / MS.DAY),
    hours: Math.floor((total / MS.HOUR) % 24),
    minutes: Math.floor((total / MS.MINUTE) % 60),
    seconds: Math.floor((total / MS.SECOND) % 60),
  };
};

const updateValue = (el, value) => {
  setText(el, addLeadingZero(value));
};

const updateLabel = (el, value, titles) => {
  if (titles) {
    setText(el, getDeclension(value, titles));
  }
};

const updateVisibility = (block, isVisible) => {
  if (block && block.hidden !== !isVisible) {
    block.hidden = !isVisible;
  }
};

const collectUnits = (root) => {
  const units = {};
  const elements = root.querySelectorAll(
    '[data-timer-unit], [data-timer-label]',
  );

  elements.forEach((el) => {
    const { timerUnit, timerLabel } = el.dataset;
    const name = timerUnit || timerLabel;

    if (!units[name]) {
      units[name] = { valueEl: null, labelEl: null, block: null };
    }

    if (timerUnit) {
      units[name].valueEl = el;
      units[name].block = el.closest('.timer__block');
    } else {
      units[name].labelEl = el;
    }
  });
  return units;
};

const render = (units, time, lang) => {
  const labels = LABELS[lang] || LABELS[DEFAULT_LANG];

  Object.entries(units).forEach(([key, refs]) => {
    const value = time[key];
    updateValue(refs.valueEl, value);
    updateLabel(refs.labelEl, value, labels[key]);

    if (key === 'days') {
      updateVisibility(refs.block, value > 0);
    }
  });
};

const createTimerInstance = (root, to, options = {}) => {
  const {
    endMessage = '',
    onEnd = null,
    lang = options.lang || document.documentElement.lang || DEFAULT_LANG,
  } = options;

  let targetDate;
  try {
    targetDate = getTargetDate(to);
  } catch (e) {
    console.error(e.message);
    return null;
  }

  const units = collectUnits(root);
  let timeoutId = null;

  const stop = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  const tick = () => {
    const time = getTimeRemaining(targetDate);
    const isFinished = time.total <= 0;

    render(units, time, lang);

    if (isFinished) {
      if (endMessage) {
        root.textContent = endMessage;
      }
      if (typeof onEnd === 'function') {
        onEnd();
      }
      stop();
    } else {
      timeoutId = setTimeout(tick, 1000 - (Date.now() % 1000));
    }
  };

  tick();
  return { stop };
};

const timer = (to, selector = '[data-timer]', options = {}) => {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).map((el) => createTimerInstance(el, to, options));
};

export default timer;
