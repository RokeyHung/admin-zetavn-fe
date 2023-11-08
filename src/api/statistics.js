import axios from 'axios'
import { api_url } from '../utils/index'

export const statisticsUsers = async (startDay, endDay, pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `${api_url}/admins/statistics/users?startDay=${startDay}&endDay=${endDay}&pageNumber=${pageNumber}&pageSize=${pageSize}`
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
      `${api_url}/admins/statistics/posts?startDay=${startDay}&endDay=${endDay}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
