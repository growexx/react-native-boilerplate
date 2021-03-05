import ReactNative from 'react-native'
import I18n from 'react-native-i18n'
import en from './locales/en.json'

I18n.fallbacks = true
I18n.translations = {
    en,
}
ReactNative.I18nManager.allowRTL(false)

export function strings(name, params = {}) {
    return I18n.t(name, params)
}

export default I18n
