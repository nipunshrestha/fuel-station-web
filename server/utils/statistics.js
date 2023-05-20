const getAveragePrice = (prices) => {
  if (!prices || prices.length < 1) {
    return
  }

  return prices.reduce((total, next) => total + next.price, 0) / prices.length
}

const getMinPrice = (prices) => {
  if (!prices || prices.length < 1) {
    return
  }

  return prices.reduce((prev, current) => (prev.price < current.price) ? prev : current)
}

const getMaxPrice = (prices) => {
  if (!prices || prices.length < 1) {
    return
  }

  return prices.reduce((prev, current) => (prev.price > current.price) ? prev : current)
}

module.exports = { getAveragePrice, getMinPrice, getMaxPrice }