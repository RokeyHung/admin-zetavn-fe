import axios from 'axios'

export const getPostById = async () => {
  try {
    const response = await axios.get(`http://localhost:8888/api/v0/posts/cdf9f723-99ab-4be3-ae76-024c953589e0`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
