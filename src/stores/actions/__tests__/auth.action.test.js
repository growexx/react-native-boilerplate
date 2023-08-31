import { login } from '../auth.action'
import { store } from '@stores'
import { loginUser } from '@api/fakeApiLogin'
import { Alert } from 'react-native'
import {
  clearRedux,
  logout,
  getInfoFromToken,
  signInwithFacebook,
  signInWithGoogle,
  signInWithInstagram,
  signInWithApple
} from '@actions/auth.action'

jest.mock('@api/fakeApiLogin')
jest.spyOn(Alert, 'alert')

describe('auth action test', () => {
  it('should call loginRequest', async () => {
    loginUser.mockImplementation(() => {
      return { data: { email: 'test@example.com', password: 'Test@1234' } }
    })
    await store.dispatch(login('test@example.com', 'Test@1234'))
    expect(store.getState().authReducer.isLoggedIn).toBe(true)
  })

  it('should handle function calls', async () => {
    loginUser.mockRejectedValue(() => null)
    await store.dispatch(logout())
    expect(store.getState().authReducer.isLoggedIn).toBe(false)
    await store.dispatch(clearRedux())
    expect(store.getState().authReducer.error).toBe(null)
    await store.dispatch(login('test@example.com', 'Test@1234'))
    expect(store.getState().authReducer.error).toBe(undefined)
  })

  it('should handle error in sign in with facebook', async () => {
    await getInfoFromToken('test-token')
    await signInwithFacebook('error', { error: 'Something went wrong' })
    expect(Alert.alert).toHaveBeenCalledWith(
      'login has error: Something went wrong'
    )
  })

  it('should handle signin with facebook if user cancelled', async () => {
    await signInwithFacebook(null, { isCancelled: true })
    expect(Alert.alert).toHaveBeenCalledWith('User cancelled!')
    await signInwithFacebook(null, { isCancelled: false })
    expect(Alert.alert).toHaveBeenCalledWith('User cancelled!')
  })

  it('should handle signin with google, instagram and apple', async () => {
    await store.dispatch(signInWithGoogle(null, { isCancelled: true }))
    expect(store.getState().authReducer.isLoading).toBe(false)
    await store.dispatch(signInWithInstagram('test-token'))
    expect(store.getState().authReducer.isLoading).toBe(false)
    await signInWithApple()
    expect(store.getState().authReducer.isLoading).toBe(false)
  })
})
