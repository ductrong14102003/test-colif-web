export const formatPrice = (value) => {
  if (!value) {
    return 0;
  }

  const formattedNumber = new Intl.NumberFormat("de-DE").format(value);

  return formattedNumber;
};
