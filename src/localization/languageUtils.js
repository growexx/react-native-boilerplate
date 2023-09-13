import * as RNLocalize from 'react-native-localize'
import * as StorageService from '../utils/StorageService'
import en from './en'
import hin from './hin'
import ar from './ar'
import constants from '../constants/constants'

export default class LanguageUtils {
  static languages = {
    english: 'english',
    hindi: 'hindi',
    arabic: 'arabic',
  }
  static changeLanguageGlobal = 'CHANGE_LANGUAGE_GLOBAL'
  static indianLocales = ['en', 'hi-IN']
  static currentAppLanguage = this.setAppLanguageFromDeviceLocale(true)
  static setAppLanguageFromDeviceLocale(needToGetLang) {
    const deviceLocale = RNLocalize.findBestLanguageTag(this.indianLocales)
    const languageTag = deviceLocale?.languageTag || 'en'
    const isHinDetected = this.indianLocales.find(
      locale => 'hi-IN' === languageTag
    )
    const language = isHinDetected
      ? this.languages.hindi
      : this.languages.english

    if (needToGetLang) {
      return language
    }
    this.setAppLanguage(language)
  }

  static async setAppLanguageFromDeviceStorage() {
    const language = await StorageService.getItem(constants.APP_LANGUAGE)
    if (language) {
      this.setAppLanguage(language)
    } else {
      this.setAppLanguageFromDeviceLocale()
    }
  }

  static async setAppLanguage(language) {
    this.currentAppLanguage = language
    await StorageService.saveItem(constants.APP_LANGUAGE, language)
  }

  static async switchAppLanguage() {
    if (this.currentAppLanguage === this.languages.english) {
      this.setAppLanguage(this.languages.arabic)
    }
    // else if (this.currentAppLanguage === this.languages.hindi) {
    //   this.setAppLanguage(this.languages.arabic)
    // }
    else {
      this.setAppLanguage(this.languages.english)
    }
  }

  static getLangText(key) {
    if (this.currentAppLanguage === this.languages.hindi) {
      return hin[key]
    } else if (this.currentAppLanguage === this.languages.arabic) {
      return ar[key]
    }
    return en[key]
  }

  static getSpecificLangText(lang, key) {
    console.log('text is ', lang[key], 'lang is ', lang, 'key is ', key)
    if (lang === this.languages.hindi) {
      return hin[key]
    }
    return en[key]
  }
}
