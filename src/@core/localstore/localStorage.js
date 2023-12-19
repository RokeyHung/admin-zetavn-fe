import useCookie from './useCookie'

export const tokenAuthorization = () => {
  const { getCookie } = useCookie()

  return `Bearer ${getCookie('token')}`
}
