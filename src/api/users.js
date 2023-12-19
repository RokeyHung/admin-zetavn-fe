import axios from 'axios'
import { api_url } from '../utils/index'
import { tokenAuthorization } from 'src/@core/localstore/localStorage'

export const getAllUser = async (status, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/users?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const getOneUser = async id => {
  try {
    const response = await axios.get(`${api_url}/admins/users/${id}`, {
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

// export const update = async (userData, updates) => {
//   try {
//     const response = await axios.put(
//       `${api_url}/admins/users`,
//       {
//         ...userData,
//         ...updates
//       },
//       {
//         headers: {
//           Authorization: tokenAuthorization()
//         }
//       }
//     )

//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

export const create = async userData => {
  try {
    const response = await axios.post(
      `${api_url}/admins/users`,
      {
        ...userData
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

export const lockUserAccount = async (userId, status, role) => {
  try {
    const response = await axios.put(
      `${api_url}/admins/users/lock/${userId}?status=${status}&role=${role}`,
      {},
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
