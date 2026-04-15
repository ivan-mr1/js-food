export const formatDate = (input, options = {}) => {
  const { separator = '.', format = 'DD.MM.YYYY' } = options;

  const d = new Date(input);
  if (Number.isNaN(d.getTime())) {
    return '';
  }

  const map = {
    DD: String(d.getDate()).padStart(2, '0'),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    YYYY: d.getFullYear(),
  };

  return format
    .replace(/DD|MM|YYYY/g, (token) => map[token])
    .replace(/\./g, separator);
};

// formatDate(date);
// 05.06.2026

// formatDate(date, { separator: '-' });
// 05-06-2026

// formatDate(date, { format: 'YYYY/MM/DD' });
// 2026/06/05
