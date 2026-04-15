const getTimeRemaining = (endTime) => {
  const total = Math.max(0, Date.parse(endTime) - Date.now());

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
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
