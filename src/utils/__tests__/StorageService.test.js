import { getItem, saveItem } from '../StorageService'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

describe('Storage Service test', () => {
  test('should recieve the item from storage', async () => {
    AsyncStorage.getItem.mockReturnValue('{"test":"test"}')
    const item = await getItem('test')
    expect(item.test).toBe('test')
  })

  test('should recieve the item from storage and handle null value', async () => {
    AsyncStorage.getItem.mockReturnValue(null)
    const item = await getItem('test')
    expect(item).toBe(null)
  })

  test('should set the item to storage', async () => {
    AsyncStorage.setItem.mockReturnValue(jest.fn())
    const res = await saveItem('test', 'test')
    expect(res).toBe(undefined)
  })
})
