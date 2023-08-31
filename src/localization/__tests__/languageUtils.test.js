import LanguageUtils from '../languageUtils'
import { getItem } from '../../utils/StorageService'
import languagekeys from '../languagekeys'
import { findBestLanguageTag } from 'react-native-localize'

jest.mock('../../utils/StorageService.js')
jest.mock('react-native-localize')

describe('Language Utils test', () => {
  it('should setAppLanguageFromDeviceLocale', () => {
    findBestLanguageTag.mockImplementation(() => {
      return { languageTag: 'hi-IN' }
    })
    LanguageUtils.setAppLanguageFromDeviceLocale(false)
    expect(LanguageUtils.currentAppLanguage).toBe('hindi')
  })

  it('should setAppLanguageFromDeviceLocale by default to english', () => {
    findBestLanguageTag.mockImplementation(() => null)
    LanguageUtils.setAppLanguageFromDeviceLocale(false)
    expect(LanguageUtils.currentAppLanguage).toBe('english')
  })

  it('should setAppLanguageFromDeviceStorage', () => {
    getItem.mockImplementation(() => 'english')
    LanguageUtils.setAppLanguageFromDeviceStorage()
    expect(LanguageUtils.currentAppLanguage).toBe('english')
  })

  it('should setAppLanguageFromDeviceStorage if langauge is not stored in async storage', () => {
    getItem.mockImplementation(() => null)
    LanguageUtils.setAppLanguageFromDeviceStorage()
    expect(LanguageUtils.currentAppLanguage).toBe('english')
  })

  it('should switchAppLanguage', () => {
    LanguageUtils.switchAppLanguage()
    expect(LanguageUtils.currentAppLanguage).toBe('hindi')
    LanguageUtils.switchAppLanguage()
    expect(LanguageUtils.currentAppLanguage).toBe('english')
  })

  it('should getLangText', () => {
    LanguageUtils.getLangText(languagekeys.changePassword)
    LanguageUtils.switchAppLanguage()
    LanguageUtils.getLangText(languagekeys.changePassword)
  })
})
