import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorageObject from '../localstore/useLocalStorageObject'
import useCookie from '../localstore/useCookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const { removeCookie, isCookieExpired } = useCookie()
  const { removeObject } = useLocalStorageObject('userInfo')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    console.log('logout function')
    router.push('/login')
    removeCookie('token')
    removeObject()
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const isExpired = isCookieExpired('token')
    if (!isExpired) {
      setIsLoggedIn(true)
      return
    }

    if (isExpired && !router.pathname.includes('/login')) {
      logout()
    }
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
