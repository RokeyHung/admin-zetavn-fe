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

export function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1, cookie.length)
    }
  }
  return null
}

// Hàm để kiểm tra xem cookie có hết hạn chưa
export function isCookieExpired(name) {
  const cookieValue = getCookie(name)

  if (cookieValue) {
    // Đọc thời gian hết hạn từ cookie
    const expiresAt = new Date(cookieValue).getTime()

    // So sánh với thời gian hiện tại
    return expiresAt < Date.now()
  }

  return true // Cookie không tồn tại
}

// Hàm để thiết lập cookie
export function setCookie(name, value, seconds) {
  const expires = new Date(Date.now() + seconds * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

// Hàm để xóa cookie bằng tên
export function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
