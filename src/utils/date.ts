export const getFilterDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return date.toISOString().split('T')[0];
};
