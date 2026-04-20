// ==============================
// Utils
// ==============================

export const buildYoutubeUrl = (code, options = {}) => {
  const { autoplay = true, rel = 0, showinfo = 0 } = options;

  const params = new URLSearchParams({
    rel,
    showinfo,
    autoplay: autoplay ? '1' : '0',
    mute: autoplay ? '1' : '0', // Обязательно для работы autoplay в большинстве браузеров
  });

  return `https://www.youtube.com/embed/${code}?${params.toString()}`;
};

const createYoutubeIframe = (autoplay) => {
  const iframe = document.createElement('iframe');
  iframe.allowFullscreen = true;
  iframe.style.border = '0';
  // Современный стандарт allow-атрибутов
  iframe.allow = autoplay
    ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    : 'encrypted-media';
  return iframe;
};

// ==============================
// Player Instance
// ==============================

export const createYoutubePlayer = (options = {}) => {
  const config = {
    autoplay: true,
    selectorPlace: '[data-youtube-place]',
    ...options,
  };

  /**
   * Инициализирует или обновляет видео в контейнере
   */
  const setup = (container, code) => {
    if (!container || !code) {
      return null;
    }

    let iframe = container.querySelector('iframe');
    const newSrc = buildYoutubeUrl(code, { autoplay: config.autoplay });

    if (!iframe) {
      iframe = createYoutubeIframe(config.autoplay);
      const place = container.querySelector(config.selectorPlace) || container;
      place.appendChild(iframe);
    }

    // Обновляем src только если он изменился, чтобы избежать лишних перезагрузок
    if (iframe.src !== newSrc) {
      iframe.src = newSrc;
    }

    iframe.style.display = '';

    return iframe;
  };

  /**
   * Очищает плеер и останавливает поток
   */
  const clear = (container) => {
    const iframe = container?.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
      iframe.style.display = 'none';
    }
  };

  return { setup, clear };
};
