export const graphPercent = (total, amount) => {
  return ((parseInt(amount) / parseInt(total)) * 100).toFixed(2);
};
export const priceToKor = (price) => {
  const formatted = parseInt(price).toLocaleString("ko-KR");
  return `${formatted} 원`;
};
