const calculator = () => {
  const result = document.querySelector('[data-calc-result]');

  let sex = 'female',
    height,
    weight,
    age,
    ratio = 1.375;

  const resultEmptyMessage = '____';

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = resultEmptyMessage;
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
      );
    }
  };

  const getButtonInformation = (parentSelector, activeClass = 'is-active') => {
    const parent = document.querySelector(parentSelector);
    const elements = parent.querySelectorAll('button');

    parent.addEventListener('click', (e) => {
      const target = e.target;

      if (!target || !target.classList.contains('calculating__choose-item')) {
        return;
      }

      if (target.hasAttribute('data-ratio')) {
        ratio = +target.getAttribute('data-ratio');
      } else if (target.hasAttribute('data-calc')) {
        sex = target.getAttribute('data-calc');
      }

      elements.forEach((el) => el.classList.remove(activeClass));
      target.classList.add(activeClass);

      calcTotal();
    });
  };

  getButtonInformation('[data-calc-gender]');
  getButtonInformation('[data-calc-activity]');

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

  getInputInformation('[data-calc-height]');
  getInputInformation('[data-calc-weight]');
  getInputInformation('[data-calc-age]');
};

export { calculator };
