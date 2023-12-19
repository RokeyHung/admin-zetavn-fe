import axios from 'axios'
import { api_url } from '../utils/index'

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${api_url}/admins/auth/login`, {
      username: username,
      password: password
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
