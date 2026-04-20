import { bodyLock, bodyUnlock } from '@/shared/lib';

const SELECTORS = {
  popup: '[data-popup]',
  link: '[data-popup-link]',
  close: '[data-popup-close]',
};

const FOCUSABLE = [
  'a[href]',
  'input:not([disabled])',
  'button:not([disabled])',
  'select',
  'textarea',
  '[tabindex]:not([tabindex^="-"])',
];

// ==============================
// DOM Utils
// ==============================

const setPopupState = (el, isOpen) => {
  if (!el) {
    return;
  }
  el.classList.toggle('is-visible', isOpen);
  el.setAttribute('aria-hidden', !isOpen);
};

const setDocumentState = (isOpen) => {
  document.documentElement.toggleAttribute('data-popup-open', isOpen);
};

const getFocusable = (root) =>
  Array.from(root.querySelectorAll(FOCUSABLE.join(',')));

const trapFocus = (e, nodes) => {
  if (e.key !== 'Tab' || !nodes.length) {
    return;
  }

  const first = nodes[0];
  const last = nodes[nodes.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    last.focus();
    e.preventDefault();
  } else if (!e.shiftKey && document.activeElement === last) {
    first.focus();
    e.preventDefault();
  }
};

// ==============================
// Instance
// ==============================

const createPopupInstance = (options = {}) => {
  const config = {
    bodyLock: true,
    closeEsc: true,
    onOpen: () => {},
    onClose: () => {},
    ...options,
  };

  let active = null;
  let lastFocus = null;
  let focusableCache = [];

  const close = ({ skipUnlock = false } = {}) => {
    if (!active) {
      return;
    }

    setPopupState(active, false);

    if (!skipUnlock) {
      setDocumentState(false);
      if (config.bodyLock) {
        bodyUnlock();
      }
    }

    config.onClose(active);

    const prev = lastFocus;

    active = null;
    lastFocus = null;
    focusableCache = [];

    if (!skipUnlock) {
      prev?.focus();
    }
  };

  const open = (id, opener = null) => {
    // ИСПРАВЛЕНО: Правильный синтаксис селектора атрибута
    const el = document.querySelector(`[data-popup="${id}"]`);
    if (!el) {
      return;
    }

    if (active) {
      close({ skipUnlock: true });
    }

    active = el;
    lastFocus = opener || document.activeElement;
    focusableCache = getFocusable(active);

    setPopupState(active, true);
    setDocumentState(true);

    if (config.bodyLock) {
      bodyLock();
    }

    config.onOpen(active, opener);

    requestAnimationFrame(() => focusableCache[0]?.focus());
  };

  const handleKeyDown = (e) => {
    if (!active) {
      return;
    }

    if (e.key === 'Escape' && config.closeEsc) {
      close();
      return;
    }

    trapFocus(e, focusableCache);
  };

  return { open, close, handleKeyDown };
};

// ==============================
// Public API
// ==============================

const popup = (options = {}) => {
  const instance = createPopupInstance(options);

  const handleClick = (e) => {
    const link = e.target.closest(SELECTORS.link);
    const closeBtn = e.target.closest(SELECTORS.close);
    const overlay = e.target.closest(SELECTORS.popup);

    if (link) {
      e.preventDefault();
      const id = link.dataset.popupLink || link.dataset.popup;
      instance.open(id, link);
    }

    if (closeBtn || (overlay && e.target === overlay)) {
      e.preventDefault();
      instance.close();
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', instance.handleKeyDown);

  return {
    open: instance.open,
    close: instance.close,
    destroy: () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', instance.handleKeyDown);
    },
  };
};

export default popup;
