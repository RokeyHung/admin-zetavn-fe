export const api_url = 'http://localhost:8888/api/v0'

export const http_url = 'http://localhost:3000'

export const formatNumber = number => {
  if (typeof number === 'undefined' || number === null) {
    return 0
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k'
  } else {
    return number.toLocaleString()
  }
}
