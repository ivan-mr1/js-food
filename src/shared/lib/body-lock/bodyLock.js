let _bodyLockStatus = true;

export const getBodyLockStatus = () => _bodyLockStatus;

const setBodyLockStatus = (delay) => {
  _bodyLockStatus = false;
  setTimeout(() => {
    _bodyLockStatus = true;
  }, delay);
};

const getScrollbarWidthRem = () => {
  const scrollbarWidthPx = window.innerWidth - document.body.clientWidth;
  if (scrollbarWidthPx <= 0) {
    return 0;
  }

  const rootFontSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return scrollbarWidthPx / rootFontSize + 'rem';
};

const setPadding = (value = '') => {
  const elements = document.querySelectorAll('[data-right-padding]');
  elements.forEach((el) => {
    el.style.paddingRight = value;
  });
  document.body.style.paddingRight = value;
};

export const bodyLock = (delay = 500) => {
  if (!_bodyLockStatus) {
    return;
  }

  const width = getScrollbarWidthRem();

  if (width !== 0) {
    setPadding(width);
    document.documentElement.style.setProperty('--scrollbar-width', width);
  }

  document.documentElement.setAttribute('data-scroll-lock', '');
  setBodyLockStatus(delay);
};

export const bodyUnlock = (delay = 500) => {
  if (!_bodyLockStatus) {
    return;
  }

  setPadding('');
  document.documentElement.style.removeProperty('--scrollbar-width');
  document.documentElement.removeAttribute('data-scroll-lock');

  setBodyLockStatus(delay);
};

export const bodyLockToggle = (delay = 500) => {
  if (document.documentElement.hasAttribute('data-scroll-lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
