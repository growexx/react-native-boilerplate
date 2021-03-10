import axios from 'axios'
import { configs } from '@constants'

export const GET = async url => {
  return new Promise((resolve, reject) => {
    axios
      .get(configs.API_URL + url)
      .then(response => {
        if (response.status != 200) {
          reject({
            error: 'Request Failed **',
            status: 'failed'
          })
          return
        }
        return response.data
      })
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const POST = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(configs.API_URL + url, data)
      .then(response => {
        return response.data
      })
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const PUT = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(response => {
        return response.data
      })
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}
