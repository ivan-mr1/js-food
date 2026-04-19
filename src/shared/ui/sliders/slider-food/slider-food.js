import { addLeadingZero } from '@/shared/lib';

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

  const updateTrack = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const updateCounter = () => {
    if (!current) {
      return;
    }
    current.textContent = addLeadingZero(index + 1);
  };

  const updateSlidesA11y = () => {
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== index);
    });
  };

  const updateBullets = () => {
    if (!bullets.length) {
      return;
    }

    bullets.forEach((bullet, i) => {
      const isActive = i === index;

      bullet.classList.toggle('is-active', isActive);

      if (isActive) {
        bullet.setAttribute('aria-current', 'true');
      } else {
        bullet.removeAttribute('aria-current');
      }
    });
  };

  const updateSlider = () => {
    updateTrack();
    updateCounter();
    updateSlidesA11y();
    updateBullets();
  };

  const goToSlide = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    updateSlider();
  };

  if (pagination) {
    const fragment = document.createDocumentFragment();

    slides.forEach((_, i) => {
      const bullet = document.createElement('button');
      bullet.className = 'slider__bullet';
      bullet.type = 'button';
      bullet.dataset.index = i;
      bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

      fragment.appendChild(bullet);
      bullets.push(bullet);
    });

    pagination.appendChild(fragment);

    pagination.addEventListener('click', (e) => {
      const bullet = e.target.closest('.slider__bullet');
      if (!bullet) {
        return;
      }

      goToSlide(Number(bullet.dataset.index));
    });
  }

  if (total) {
    total.textContent = addLeadingZero(slides.length);
  }

  prev.addEventListener('click', () => goToSlide(index - 1));
  next.addEventListener('click', () => goToSlide(index + 1));

  updateSlider();
};

export const sliderFood = () => {
  document.querySelectorAll('[data-slider]').forEach(initSlider);
};
