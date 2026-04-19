const calculator = () => {
  const result = document.querySelector('[data-calc-result]');
  const resultEmptyMessage = '____';

  let sex = 'female',
    height,
    weight,
    age,
    ratio = 1.375;

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
        ratio = +target.getAttribute('data-ratio');
      } else if (target.hasAttribute('data-calc')) {
        sex = target.getAttribute('data-calc');
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

  getButtonInformation('[data-calc-gender]');
  getButtonInformation('[data-calc-activity]');

  getInputInformation('[data-calc-height]');
  getInputInformation('[data-calc-weight]');
  getInputInformation('[data-calc-age]');

  calcTotal();
};

export { calculator };
