import { formatValue } from '@/shared/lib';

const initSlider = (rootContainer) => {
  if (!rootContainer) {
    return;
  }

  const prev = rootContainer.querySelector('[data-slider-btn-prev]');
  const next = rootContainer.querySelector('[data-slider-btn-next]');
  const total = rootContainer.querySelector('[data-slider-counter-total]');
  const current = rootContainer.querySelector('[data-slider-counter-current]');
  const track = rootContainer.querySelector('[data-slider-track]');
  const slides = rootContainer.querySelectorAll('[data-slider-slide]');
  const pagination = rootContainer.querySelector('[data-slider-pagination]');

  if (!track || !slides.length || !prev || !next) {
    return;
  }

  let index = 0;
  let bullets = [];

  if (pagination) {
    pagination.innerHTML = '';

    for (let i = 0; i < slides.length; i++) {
      const bullet = document.createElement('button');

      bullet.className = 'slider__bullet';
      bullet.type = 'button';
      bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

      bullet.addEventListener('click', () => goToSlide(i));

      pagination.appendChild(bullet);
      bullets.push(bullet);
    }
  }

  const updateSlider = () => {
    track.style.transform = `translateX(-${index * 100}%)`;

    if (current) {
      current.textContent = formatValue(index + 1);
    }

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });

    if (bullets.length) {
      bullets.forEach((bullet, i) => {
        const isActive = i === index;

        bullet.classList.toggle('is-active', isActive);

        if (isActive) {
          bullet.setAttribute('aria-current', 'true');
        } else {
          bullet.removeAttribute('aria-current');
        }
      });
    }
  };

  const goToSlide = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    updateSlider();
  };

  if (total) {
    total.textContent = formatValue(slides.length);
  }

  prev.addEventListener('click', () => goToSlide(index - 1));
  next.addEventListener('click', () => goToSlide(index + 1));

  updateSlider();
};

const sliderFood = () => {
  const sliders = document.querySelectorAll('[data-slider]');
  sliders.forEach(initSlider);
};

export { sliderFood };
