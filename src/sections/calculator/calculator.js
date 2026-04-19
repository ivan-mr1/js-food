const calculator = () => {
  const result = document.querySelector('[data-calc-result]');
  const resultEmptyMessage = '____';

  let sex = localStorage.getItem('sex') || 'female';
  let ratio = localStorage.getItem('ratio') || 1.375;
  let height, weight, age;

  const initLocalSettings = (selector, activeClass = 'is-active') => {
    const elements = document.querySelectorAll(`${selector} button`);

    elements.forEach((btn) => {
      btn.classList.remove(activeClass);
      if (btn.getAttribute('data-calc') === sex) {
        btn.classList.add(activeClass);
      }
      if (btn.getAttribute('data-ratio') === ratio) {
        btn.classList.add(activeClass);
      }
    });
  };

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = resultEmptyMessage;
      return;
    }

    const bmr =
      sex === 'female'
        ? 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age
        : 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;

    result.textContent = Math.round(bmr * ratio);
  };

  const getButtonInformation = (parentSelector, activeClass = 'is-active') => {
    const parent = document.querySelector(parentSelector);

    parent.addEventListener('click', (e) => {
      const target = e.target.closest('.calculating__choose-item');

      if (!target || target.classList.contains(activeClass)) {
        return;
      }

      if (target.hasAttribute('data-ratio')) {
        ratio = Number(target.getAttribute('data-ratio'));
        localStorage.setItem('ratio', ratio);
      } else {
        sex = target.getAttribute('data-calc');
        localStorage.setItem('sex', sex);
      }

      parent.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
      target.classList.add(activeClass);

      calcTotal();
    });
  };

  const getInputInformation = (selector) => {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      const val = +input.value;

      if (input.hasAttribute('data-calc-height')) {
        height = val;
      } else if (input.hasAttribute('data-calc-weight')) {
        weight = val;
      } else if (input.hasAttribute('data-calc-age')) {
        age = val;
      }

      calcTotal();
    });
  };

  initLocalSettings('[data-calc-gender]');
  initLocalSettings('[data-calc-activity]');

  getButtonInformation('[data-calc-gender]');
  getButtonInformation('[data-calc-activity]');

  getInputInformation('[data-calc-height]');
  getInputInformation('[data-calc-weight]');
  getInputInformation('[data-calc-age]');

  calcTotal();
};

export { calculator };
