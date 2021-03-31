import axios from 'axios'
import { configs } from '@constants'

export const GET = async url => {
  return new Promise((resolve, reject) => {
    axios
      .get(configs.API_URL + url)
      .then(response => {
        if (response.status !== 200) {
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
