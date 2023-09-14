import * as StorageService from '../../utils/StorageService';
import languagekeys from '../languagekeys';
import LanguageUtils from './../languageUtils'; // Import your LanguageUtils class
import * as RNLocalize from 'react-native-localize'
import hin from './../hin'
import en from '../en';

describe('LanguageUtils', () => {
    // Test case for setAppLanguageFromDeviceLocale
    it('should set the app language from device locale to Hindi if detected', () => {
        jest.spyOn(RNLocalize, 'findBestLanguageTag').mockReturnValue({ languageTag: 'hi-IN' });
        const language = LanguageUtils.setAppLanguageFromDeviceLocale(true);
        expect(language).toBe(LanguageUtils.languages.hindi);
    });

    // Test case for setAppLanguageFromDeviceLocale when Hindi is not detected
    it('should set the app language from device locale to English if not detected', () => {
        jest.spyOn(RNLocalize, 'findBestLanguageTag').mockReturnValue({ languageTag: 'fr-FR' });
        const language = LanguageUtils.setAppLanguageFromDeviceLocale(true);
        expect(language).toBe(LanguageUtils.languages.english);
    });

    // Test case for setAppLanguageFromDeviceLocale when needToGetLang is false
    it('should set the app language without returning it when needToGetLang is false', () => {
        // Mocking findBestLanguageTag to return 'fr-FR' (French) which is not in indianLocales
        jest.spyOn(RNLocalize, 'findBestLanguageTag').mockReturnValue({ languageTag: 'fr-FR' });
        const language = LanguageUtils.setAppLanguageFromDeviceLocale(false);
        expect(language).toBeUndefined(); // It should not return the language
    });

    it('should setAppLanguageFromDeviceLocale', () => {
        jest.spyOn(RNLocalize, 'findBestLanguageTag').mockReturnValue({
            languageTag: 'hi-IN'
        })
        LanguageUtils.setAppLanguageFromDeviceLocale(false)
        expect(LanguageUtils.currentAppLanguage).toBe('hindi')
    })

    it('should setAppLanguageFromDeviceLocale by default to english', () => {
        // findBestLanguageTag.mockImplementation(() => null)
        jest.spyOn(RNLocalize, 'findBestLanguageTag').mockReturnValue({

        })
        LanguageUtils.setAppLanguageFromDeviceLocale(false)
        expect(LanguageUtils.currentAppLanguage).toBe('english')
    })

    it('should setAppLanguageFromDeviceStorage', () => {
        // getItem.mockImplementation(() => 'english')
        jest.spyOn(StorageService, 'getItem').mockReturnValue('english')
        LanguageUtils.setAppLanguageFromDeviceStorage()
        expect(LanguageUtils.currentAppLanguage).toBe('english')
    })

    it('should setAppLanguageFromDeviceStorage if langauge is not stored in async storage', () => {
        jest.spyOn(StorageService, 'getItem').mockReturnValue(null)
        LanguageUtils.setAppLanguageFromDeviceStorage()
        expect(LanguageUtils.currentAppLanguage).toBe('english')
    })

    it('should switchAppLanguage', () => {
        LanguageUtils.switchAppLanguage()
        expect(LanguageUtils.currentAppLanguage).toBe('arabic')
        LanguageUtils.switchAppLanguage()
        expect(LanguageUtils.currentAppLanguage).toBe('english')
    })

    it('should getLangText', () => {
        LanguageUtils.getLangText(languagekeys.changePassword)
        LanguageUtils.switchAppLanguage()
        LanguageUtils.getLangText(languagekeys.changePassword)
    })

    it('should getSpecificLangText for hindi', () => {
        LanguageUtils.getSpecificLangText('hindi', languagekeys.addTodo)
        LanguageUtils.getLangText(hin[languagekeys.addTodo])
    })

    it('should getSpecificLangText for english', () => {
        LanguageUtils.getSpecificLangText('english', languagekeys.addTodo)
        LanguageUtils.getLangText(en[languagekeys.addTodo])
    })
});
