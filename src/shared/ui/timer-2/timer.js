const timer = () => {
  const deadline = '2026-05-15';

  const getTimeRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date());
    const total = t <= 0 ? 0 : t;

    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  };

  // const addZero = (num) => (num >= 0 && num < 10 ? `0${num}` : num);
  const addZero = (num) => String(num).padStart(2, '0');

  const setClock = (endTime, selector = '[data-timer]') => {
    const timer = document.querySelector(selector);

    if (!timer) {
      return;
    }

    const elements = {};

    timer.querySelectorAll('[data-timer-unit]').forEach((el) => {
      const unit = el.dataset.timerUnit;
      elements[unit] = el;
    });

    const updateClock = () => {
      const t = getTimeRemaining(endTime);

      elements.days.textContent = addZero(t.days);
      elements.hours.textContent = addZero(t.hours);
      elements.minutes.textContent = addZero(t.minutes);
      elements.seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerInterval);
      }
    };

    const timerInterval = setInterval(updateClock, 1000);
    updateClock();
  };

  setClock(deadline);
};

export default timer;
