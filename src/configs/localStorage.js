import { getSessionData } from 'src/utils/session'

export const tokenAuthorization = () => {
  const token = getSessionData('tok')
  console.log('🚀 ~ file: localStorage.js:5 ~ tokenAuthorization ~ token:', token)

  return `Bearer ${token}`
}
