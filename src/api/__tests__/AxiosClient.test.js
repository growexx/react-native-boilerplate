import axios from 'axios'
import { GET, POST, PATCH, DELETE } from '../AxiosClient'

import handleLogin from '../../controllers/loginController'
import { loginUser } from '../fakeApiLogin'
import { getUsers } from '@api'

jest.mock('axios')
jest.mock('../../controllers/loginController')

describe('Axios Client test', () => {
  it('should resolve with response data on successful request', async () => {
    const responseData = { data: 'some data' }
    axios.get.mockResolvedValue({ status: 200, data: responseData })
    const result = await GET('/some-url')
    expect(result).toEqual(responseData)
  })

  it('should resolve with response successful request if there is no data from server', async () => {
    axios.get.mockResolvedValue({ status: 200 })
    const result = await GET('/some-url')
    expect(result).toEqual({ status: 200 })
  })

  it('should reject with an error object on failed request with error code 400', async () => {
    axios.get.mockResolvedValue({ status: 400 })
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'Inappropriate request',
        status: 'failed'
      })
    }
  })

  it('should reject with an error object on failed request with error code 401', async () => {
    axios.get.mockResolvedValue({ status: 401 })
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'User not authorized',
        status: 'failed'
      })
    }
  })

  it('should reject with an error object on failed request with error code 404', async () => {
    axios.get.mockResolvedValue({ status: 404 })
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'End point not found',
        status: 'failed'
      })
    }
  })

  it('should reject with an error object on failed request with error code 404', async () => {
    axios.get.mockResolvedValue({ status: 404 })
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'End point not found',
        status: 'failed'
      })
    }
  })

  it('should reject with an error object on failed request with error code 500', async () => {
    axios.get.mockResolvedValue({ status: 500 })
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'Something went wrong',
        status: 'failed'
      })
    }
  })

  it('should reject with an error object on network error', async () => {
    const networkError = new Error('Network error')
    axios.get.mockRejectedValue(networkError)
    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual(networkError)
    }
  })

  it('should resolve with response data on successful post request', async () => {
    const responseData = { data: 'some data' }
    axios.post.mockResolvedValue({ status: 200, data: responseData })
    const result = await POST('/some-url')
    expect(result).toEqual(responseData)
  })

  it('should resolve with response data on successful patch request', async () => {
    const responseData = { data: 'some data' }
    axios.patch.mockResolvedValue({ status: 200, data: responseData })
    const result = await PATCH('/some-url')
    expect(result).toEqual(responseData)
  })

  it('should resolve with response data on successful patch request', async () => {
    const responseData = { data: 'some data' }
    axios.delete.mockResolvedValue({ status: 200, data: responseData })
    const result = await DELETE('/some-url')
    expect(result).toEqual(responseData)
  })

  it('should handle login', async () => {
    handleLogin.mockResolvedValue(true)
    const res = await loginUser('test@example.com', 'Test@1234')
    expect(res.status).toBe('success')
  })

  it('should handle login for else condition', async () => {
    handleLogin.mockResolvedValue(false)
    await loginUser('tese', 'Te34')
  })

  it('should handle login for catch', async () => {
    handleLogin.mockRejectedValue(false)
    var res
    try {
      res = await loginUser('test@example.com', 'Test@1234')
    } catch (error) {
      expect(res).toBe(undefined)
    }
  })

  it('should call GET_BACKGROUND when getUsers is called', async () => {
    const responseData = {
      data: [{ id: 0, first_name: 'Test', last_name: 'user' }]
    }
    axios.get.mockResolvedValue({ status: 200, data: responseData })
    const users = await getUsers()
    expect(users.data[0].id).toBe(0)
  })
})
