const timer = (endTime) => {
  // const date = new Date();
  // date.setDate(date.getDate() + 50);
  // const deadline = date.toISOString();

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

  const addZero = (num) => String(num).padStart(2, '0');

  const setClock = (endTime, selector = '[data-timer]') => {
    const timerElement = document.querySelector(selector);
    if (!timerElement) {
      return;
    }

    const elements = {};
    timerElement.querySelectorAll('[data-timer-unit]').forEach((el) => {
      elements[el.dataset.timerUnit] = el;
    });

    const updateClock = () => {
      const t = getTimeRemaining(endTime);

      Object.entries(elements).forEach(([unit, el]) => {
        el.textContent = addZero(t[unit]);
      });

      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    };

    updateClock();
    const timerInterval = setInterval(updateClock, 1000);
  };

  setClock(endTime);
};

export default timer;
