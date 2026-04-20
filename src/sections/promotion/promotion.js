import { formatDate } from '@/shared/lib';
import timer from '@/shared/ui/timer/timer';

const promotion = () => {
  const date = new Date();
  date.setDate(date.getDate() + 25);
  const deadline = date.toISOString();

  timer(deadline);

  const span = document.querySelector('[data-deadline]');

  span.textContent = formatDate(deadline);
};

export default promotion;
