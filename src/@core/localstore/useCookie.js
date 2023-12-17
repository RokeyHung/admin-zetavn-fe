const useCookie = () => {
  // Hàm để lấy giá trị của cookie bằng tên
  function getCookie(name) {
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
  function isCookieExpired(name) {
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
  function setCookie(name, value, seconds) {
    const expires = new Date(Date.now() + seconds * 1000).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
  }

  // Hàm để xóa cookie bằng tên
  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  return { getCookie, isCookieExpired, setCookie, removeCookie }
}

export default useCookie
