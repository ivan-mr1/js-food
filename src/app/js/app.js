'use strict';

import { pageNavigation } from '@/shared/lib';
import Header from '@/widgets/header/Header';
import ScrollUpButton from '@/shared/ui/scrollUpButton/ScrollUpButton';
import heroTabs from '@/sections/hero/hero';
import offer from '@/sections/offer/offer';
import promotion from '@/sections/promotion/promotion';

window.addEventListener('DOMContentLoaded', () => {
  pageNavigation();
  new Header();
  new ScrollUpButton();
  heroTabs();
  offer();
  promotion();
});
