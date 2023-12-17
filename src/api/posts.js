import axios from 'axios'
import { api_url } from '../utils/index'

export const getAllPosts = async (status, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/posts?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateStatusPost = async (id, status) => {
  try {
    const response = await axios.put(`${api_url}/admins/posts`, {
      id: id,
      status: status
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getOnePost = async id => {
  try {
    const response = await axios.get(`${api_url}/admins/posts/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
