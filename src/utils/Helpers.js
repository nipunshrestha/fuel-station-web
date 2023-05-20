export const formatPrice = (price) => {
  if (!price) return '...'
  let formattedPrice = (price / 100).toFixed(3)
  return formattedPrice
}