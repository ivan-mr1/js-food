'use strict';

import { pageNavigation } from '@/shared/lib';
import Header from '@/widgets/header/Header';
import ScrollUpButton from '@/shared/ui/scrollUpButton/ScrollUpButton';

window.addEventListener('DOMContentLoaded', () => {
  pageNavigation();
  new Header();
  new ScrollUpButton();
});
