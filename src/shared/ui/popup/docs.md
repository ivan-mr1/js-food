```
<a href="#" data-popup-link="popup"></a>
```

```
<div data-popup="popup" aria-hidden="true" class="popup">
  <div data-popup-wrapper class="popup__wrapper">
    <div data-popup-body class="popup__body">
      <button
        data-popup-close
        type="button"
        class="popup__close"
        aria-label="Close popup"
        title="Close popup"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 10L10 30"
            stroke="#181C29"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 10L30 30"
            stroke="#181C29"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div data-popup-content class="popup__content">
      </div>
    </div>
  </div>
</div>
```

import popup from '@/shared/ui/popup/popup';
import { createYoutubePlayer } from '@/shared/ui/popup/popupYoutube';

const ytPlayer = createYoutubePlayer();

popup({
onOpen: (el, trigger) => {
// Ищем код видео в приоритете: кнопка -> сам попап
const code = trigger?.dataset.youtube || el.dataset.youtube;
if (code) ytPlayer.setup(el, code);
},
onClose: (el) => {
ytPlayer.clear(el);
}
});
