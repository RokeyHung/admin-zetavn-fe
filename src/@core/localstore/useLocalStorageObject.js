import { useState, useEffect } from 'react'

const useLocalStorageObject = (key, initialValue = null) => {
  const isBrowser = typeof window !== 'undefined'

  const [storedObject, setStoredObject] = useState(() => {
    if (isBrowser) {
      const storedItem = localStorage.getItem(key)
      return storedItem ? JSON.parse(storedItem) : initialValue
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(storedObject))
    }
  }, [key, storedObject, isBrowser])

  // Hàm để lưu đối tượng vào Local Storage
  const saveObject = value => {
    setStoredObject(value)
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  // Hàm để lấy đối tượng từ Local Storage
  const getObject = () => {
    return storedObject
  }

  // Hàm để xóa đối tượng từ Local Storage
  const removeObject = () => {
    setStoredObject(null)
    if (isBrowser) {
      localStorage.removeItem(key)
    }
  }

  return { saveObject, getObject, removeObject }
}

export default useLocalStorageObject
