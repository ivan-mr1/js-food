import { formatValue } from '@/shared/lib';

const sliderFood = () => {
  const slides = document.querySelectorAll('[data-slider-slide]');
  const prevButton = document.querySelector('[data-slider-btn-prev]');
  const nextButton = document.querySelector('[data-slider-btn-next]');
  const total = document.querySelector('[data-slider-counter-total]');
  const currentSlide = document.querySelector('[data-slider-counter-current]');

  let slideIndex = 1;

  const showSlides = (n) => {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((slide) => slide.classList.add('is-none'));

    slides[slideIndex - 1].classList.remove('is-none');

    currentSlide.textContent = formatValue(slideIndex);
  };

  showSlides(slideIndex);

  const plusSlides = (n) => {
    showSlides((slideIndex += n));
  };

  prevButton.addEventListener('click', () => {
    plusSlides(-1);
  });
  nextButton.addEventListener('click', () => {
    plusSlides(1);
  });

  total.textContent = formatValue(slides.length);
};

export { sliderFood };
