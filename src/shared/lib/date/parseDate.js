export const parseDate = (to) => {
  if (to instanceof Date) {
    return to;
  }
  if (typeof to === 'string') {
    return new Date(to);
  }
  if (typeof to === 'number') {
    return new Date(Date.now() + to * 1000);
  }
  return null;
};
