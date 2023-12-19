// export const getUserWithToken = async (token) => {
//    const response = await callGetAPI(`${API_USER}/token/${token}`);

import { API_AUTH, API_USER } from 'src/constants/api'
import { callGetAPI, callGetAPIAuthorization, callPostAPI } from './fetchApiService'

//    return response.data;
//  };

export const login = async data => {
  return await callPostAPI(`${API_AUTH}/login`, data)
}

export const getUserWithToken = async id => {
  const response = await callGetAPIAuthorization(`${API_USER}/${id}`)

  return response.data
}
