import axios from 'axios'
import { GET } from '../AxiosClient'

import handleLogin from '../../controllers/loginController'
import { loginUser } from '../fakeApiLogin'

jest.mock('axios')
jest.mock('../../controllers/loginController')

describe('GET function', () => {
  it('should resolve with response data on successful request', async () => {
    const responseData = { data: 'some data' }
    axios.get.mockResolvedValue({ status: 200, data: responseData })

    const result = await GET('/some-url')

    expect(result).toEqual(responseData)
  })

  it('should reject with an error object on failed request', async () => {
    axios.get.mockResolvedValue({ status: 404 })

    try {
      await GET('/some-url')
    } catch (error) {
      expect(error).toEqual({
        error: 'Request Failed **',
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

  it('should handle login', async () => {
    handleLogin.mockResolvedValue(true)
    const res = await loginUser('test@example.com', 'Test@1234')
    expect(res.status).toBe('success')
  })
  it('should handle login for else condition', async () => {
    handleLogin.mockResolvedValue(false)
    await loginUser('tese', 'Te34')
    // expect(res.status).toBe('success')
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
})
