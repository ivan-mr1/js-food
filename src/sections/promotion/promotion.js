import timer from '@/shared/ui/timer-2/timer';

const promotion = () => {
  const date = new Date();
  date.setDate(date.getDate() + 50);
  const deadline = date.toISOString();

  timer(deadline);
};

export default promotion;
