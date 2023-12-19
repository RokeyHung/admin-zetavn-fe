import axios from 'axios'
import { api_url } from '../utils/index'
import { tokenAuthorization } from 'src/@core/localstore/localStorage'

export const statisticsUsers = async (startDay, endDay, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/statistics/users?startDay=${startDay}&endDay=${endDay}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const statisticsPosts = async (startDay, endDay, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/statistics/posts?startDay=${startDay}&endDay=${endDay}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const dashboardInteract = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${api_url}/admins/statistics?startDate=${startDate}&endDate=${endDate}`, {
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

export const statisticsPostPopular = async () => {
  try {
    const response = await axios.get(`${api_url}/admins/statistics/posts/popular`, {
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

export const statisticsUserPopular = async () => {
  try {
    const response = await axios.get(`${api_url}/admins/statistics/users/popular`, {
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
