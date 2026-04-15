const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const getTimeRemaining = (endTime) => {
  const total = Math.max(0, Date.parse(endTime) - Date.now());

  return {
    total,
    days: Math.floor(total / MS_IN_DAY),
    hours: Math.floor((total / MS_IN_HOUR) % 24),
    minutes: Math.floor((total / MS_IN_MINUTE) % 60),
    seconds: Math.floor((total / MS_IN_SECOND) % 60),
  };
};

const formatValue = (num) => String(num).padStart(2, '0');

const initTimerInstance = (rootElement, endTime) => {
  const unitElements = {};
  const elements = rootElement.querySelectorAll('[data-timer-unit]');

  elements.forEach((el) => {
    unitElements[el.dataset.timerUnit] = el;
  });

  const update = () => {
    const time = getTimeRemaining(endTime);

    Object.entries(unitElements).forEach(([unit, el]) => {
      const formatted = formatValue(time[unit]);

      if (el.textContent !== formatted) {
        el.textContent = formatted;
      }
    });

    return time.total;
  };

  const total = update();
  if (total <= 0) {
    return null;
  }

  let timerId;

  timerId = setInterval(() => {
    const remaining = update();

    if (remaining <= 0) {
      clearInterval(timerId);
    }
  }, 1000);

  return timerId;
};

const timer = (endTime, selector = '[data-timer]') => {
  const timerNodes = document.querySelectorAll(selector);

  timerNodes.forEach((node) => initTimerInstance(node, endTime));
};

export default timer;
