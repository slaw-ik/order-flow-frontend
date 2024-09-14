export const prettifyDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('ru-RU');
};

export const prettifyDateTime = (date) => {
  if (!date) return '';

  const dateObj = new Date(date);
  return dateObj.toLocaleString('ru-RU');
};
