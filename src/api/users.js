import axios from 'axios'
import { api_url } from '../utils/index'

export const getAllUser = async (status, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/users?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getOneUser = async id => {
  try {
    const response = await axios.get(`${api_url}/admins/users/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const update = async (userData, updates) => {
  try {
    const response = await axios.put(`${api_url}/admins/users`, {
      ...userData,
      ...updates
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
