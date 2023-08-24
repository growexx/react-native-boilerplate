import * as RNLocalize from "react-native-localize";
import * as StorageService from "../utils/StorageService";
import en from "./en";
import hin from "./hin";
import constants from "../constants/constants";

export default class LanguageUtils {
    static languages = {
        english: "english",
        hindi: "hindi",
    }
    static changeLanguageGlobal = "CHANGE_LANGUAGE_GLOBAL"
    static indianLocales = ['en', "hi-IN"]
    static currentAppLanguage = this.setAppLanguageFromDeviceLocale(true);
    static setAppLanguageFromDeviceLocale(needToGetLang) {
        let deviceLocale = RNLocalize.findBestLanguageTag(this.indianLocales);
        const languageTag = deviceLocale?.languageTag || "en"
        const isHinDetected = this.indianLocales.find((locale) => 'hi-IN' === languageTag);
        const language = isHinDetected
            ? this.languages.hindi
            : this.languages.english;

        if (needToGetLang) {
            return language;
        }
        this.setAppLanguage(language);
    }

    static async setAppLanguageFromDeviceStorage() {
        const language = await StorageService.getItem(constants.APP_LANGUAGE);
        console.log("language", language);
        if (language) {
            this.setAppLanguage(language);
        } else {
            this.setAppLanguageFromDeviceLocale();
        }

    }

    static async setAppLanguage(language) {
        this.currentAppLanguage = language;
        await StorageService.saveItem(constants.APP_LANGUAGE, language);

    }

    static async switchAppLanguage() {
        if (this.currentAppLanguage === this.languages.english) {
            this.setAppLanguage(this.languages.hindi)
        } else {
            this.setAppLanguage(this.languages.english)
        }
    }

    static getLangText(key) {
        console.log('currentAppLanguage is ', this.currentAppLanguage)
        if (this.currentAppLanguage === this.languages.hindi) {
            return hin[key];
        }
        return en[key];
    }
}