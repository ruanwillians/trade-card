export const scrollToNegotiations = () => {
  const element = document.querySelector(
    '#tradeMarketplacePage',
  );
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
};
