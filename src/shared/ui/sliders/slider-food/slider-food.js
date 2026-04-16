import { formatValue } from '@/shared/lib';

const initSlider = (rootContainer) => {
  const prev = rootContainer.querySelector('[data-slider-btn-prev]');
  const next = rootContainer.querySelector('[data-slider-btn-next]');
  const total = rootContainer.querySelector('[data-slider-counter-total]');
  const current = rootContainer.querySelector('[data-slider-counter-current]');
  const track = rootContainer.querySelector('[data-slider-track]');
  const slides = rootContainer.querySelectorAll('[data-slider-slide]');

  if (!track || !slides.length || !prev || !next) {
    return;
  }

  let index = 0;

  const updateSlider = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (current) {
      current.textContent = formatValue(index + 1);
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

  sliders.forEach((slider) => initSlider(slider));
};

export { sliderFood };
