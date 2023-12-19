// import { createContext, useContext, useEffect, useState } from 'react'
// import { getUserWithToken } from './../services/authService'

// const AuthContext = createContext()

// function AuthProvider(props) {
//   const [user, setUser] = useState(null)
//   useEffect(() => {
//     const token = localStorage.getItem('admin_solo')
//     !!token &&
//       getUserWithToken(token).then(response => {
//         setUser(response.data)
//       })
//   }, [])

//   const value = { user, setUser }

//   return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
// }

// function useAuth() {
//   const context = useContext(AuthContext)
//   if (typeof context === 'undefined') throw new Error('useAuth must be used within a AuthProvider')

//   return context
// }

// export { useAuth, AuthProvider }

// authContext.js
import { HttpStatusCode } from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { login } from 'src/api/authService'
import { getSessionData, setSessionData } from 'src/utils/session'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const adminData = getSessionData('admin')
        console.log('🚀 ~ file: auth-context.jsx:49 ~ checkSession ~ adminData:', adminData)
        if (adminData) {
          setUser(adminData)
        }

        //   else {
        //     window.location.href = '/pages/login/'
        //   }
      } catch (error) {
        console.error('Error checking session:', error)

        // Handle  errors or redirect to login
        //   window.location.href = '/pages/login/'
      }
    }

    checkSession()
  }, [user])

  const signIn = async credentials => {
    try {
      // Perform login and update user state
      const response = await login(credentials).then(res => res?.data)
      console.log('🚀 ~ file: auth-context.jsx:68 ~ signIn ~ response:', response)
      const { code, data, message } = response
      console.log('🚀 ~ file: auth-context.jsx:70 ~ signIn ~ data:', data)

      // For example, you can use next-auth
      // const response = await signIn('credentials', { ... });

      // Update user state
      if (code === HttpStatusCode.Ok && message === 'Login success') {
         router.push('/')
        setSessionData('admin', data?.userInfo)
        setSessionData('tok', data?.access_token)
        setToken(data?.access_token)
        toast.success('Đăng nhập thành công')
      } else if (code === HttpStatusCode.Forbidden && message === 'Access denied') {
        toast.warning('Bạn không có quyền truy cập')
        console.log('Access denied')
      } else if (code === HttpStatusCode.InternalServerError && message === 'Not found username') {
        toast.error('Tài khoản không tồn tại')
      } else if (code === HttpStatusCode.InternalServerError && message === 'Invalid Username or Password!!') {
        toast.error('Sai tài khoản hoặc mật khẩu')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      toast.error('Có lỗi xảy ra')
      router.reload()

      // Handle login
    }
  }

  const signOut = async () => {
    try {
      // Perform logout and update user state
      // ...

      // For example, you can use next-auth
      // await signOut();

      // Update user state
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)

      // Handle logout errors
    }
  }

  const contextValue = {
    user,
    signIn,
    signOut,
    token
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
