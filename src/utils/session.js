export function setSessionData(key, data) {
  try {
    const jsonData = JSON.stringify(data)
    sessionStorage.setItem(key, jsonData)

    return true
  } catch (error) {
    console.error('Error setting session data:', error)

    return false
  }
}

export function getSessionData(key) {
  try {
    const data = sessionStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }

    return null
  } catch (error) {
    console.error('Error getting session data:', error)

    return null
  }
}

export function removeSessionData(key) {
  try {
    sessionStorage.removeItem(key)

    return true
  } catch (error) {
    console.error('Error removing session data:', error)

    return false
  }
}

export function clearSessionData() {
  try {
    sessionStorage.clear()

    return true
  } catch (error) {
    console.error('Error clearing session data:', error)

    return false
  }
}
