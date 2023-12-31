import axios from 'axios'
import { api_url } from '../utils/index'
import { tokenAuthorization } from 'src/@core/localstore/localStorage'

export const getAllPosts = async (status, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/posts?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: tokenAuthorization()
        }
      }
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateStatusPost = async (id, status) => {
  try {
    const response = await axios.put(
      `${api_url}/admins/posts`,
      {
        id: id,
        status: status
      },
      {
        headers: {
          Authorization: tokenAuthorization()
        }
      }
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getOnePost = async id => {
  try {
    const response = await axios.get(`${api_url}/admins/posts/${id}`, {
      headers: {
        Authorization: tokenAuthorization()
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
