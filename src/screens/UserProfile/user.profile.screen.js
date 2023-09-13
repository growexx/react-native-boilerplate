import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme
} from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '@constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import languagekeys from '../../localization/languagekeys'
import LanguageUtils from '../../localization/languageUtils'
import { useIsFocused } from '@react-navigation/native'
import { getItem } from '../../utils/StorageService'
import constants from '../../constants/constants'

const UserProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused()

  const getAppLanguage = async () => {
    await getItem(constants.APP_LANGUAGE)
  }

  useEffect(() => {
    getAppLanguage()
  }, [isFocused])
  const data = useSelector(state => state.authReducer.loginData)
  const colorScheme = useColorScheme()

  const accountItems = [
    { icon: 'key', text: LanguageUtils.getLangText(languagekeys.security) },
    {
      icon: 'bell',
      text: LanguageUtils.getLangText(languagekeys.notification)
    },
    { icon: 'eye', text: LanguageUtils.getLangText(languagekeys.privacy) }
  ]

  const supportItems = [
    {
      icon: 'money',
      text: LanguageUtils.getLangText(languagekeys.subscription)
    },
    {
      icon: 'support',
      text: LanguageUtils.getLangText(languagekeys.helpSupports)
    },
    {
      icon: 'legal',
      text: LanguageUtils.getLangText(languagekeys.termsConditions)
    }
  ]

  const cacheAndCellularItems = [
    {
      icon: 'rocket',
      text: LanguageUtils.getLangText(languagekeys.freeUpSpaces)
    },
    { icon: 'save', text: LanguageUtils.getLangText(languagekeys.dataSaver) }
  ]

  const actionsItems = [
    // {
    //   icon: 'flag',
    //   text: LanguageUtils.getLangText(languagekeys.reportProblem)
    // },
    { icon: 'user', text: LanguageUtils.getLangText(languagekeys.addAccount) }
  ]
  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity onPress={action} style={styles.itemPress}>
      <Icon
        name={icon}
        size={24}
        color={colorScheme === 'dark' ? 'white' : 'black'}
        paddingLeft={10}
      />
      <Text
        style={colorScheme === 'dark' ? styles.itemTextDark : styles.itemText}>
        {text}{' '}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView
      style={{
        flex: 1
        // backgroundColor: colors.light.lightPrimary
      }}>
      <ScrollView style={{ marginHorizontal: 12, marginVertical: 12 }}>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://picsum.photos/200/300' }}
            style={styles.userImage}
          />
        </View>
        <Text style={colorScheme === 'dark' ? styles.textDark : styles.text}>
          Name : {data?.name ?? ''}
        </Text>
        <Text style={colorScheme === 'dark' ? styles.textDark : styles.text}>
          {data?.email ?? ''}
        </Text>

        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={
              colorScheme === 'dark'
                ? styles.headingTextDark
                : styles.headingText
            }>
            {LanguageUtils.getLangText(languagekeys.account)}
          </Text>
          <View style={styles.titleText}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text
            style={
              colorScheme === 'dark'
                ? styles.headingTextDark
                : styles.headingText
            }>
            {LanguageUtils.getLangText(languagekeys.support)}
          </Text>
          <View style={styles.titleText}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Cache & Cellular */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={
              colorScheme === 'dark'
                ? styles.headingTextDark
                : styles.headingText
            }>
            {LanguageUtils.getLangText(languagekeys.caches)}
          </Text>
          <View style={styles.titleText}>
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text
            style={
              colorScheme === 'dark'
                ? styles.headingTextDark
                : styles.headingText
            }>
            {LanguageUtils.getLangText(languagekeys.action)}
          </Text>
          <View style={styles.titleText}>
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    marginBottom: 15
  },
  userImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 75
  },
  text: {
    alignSelf: 'center',
    fontWeight: '300',
    marginBottom: 5,
    fontFamily: fonts.BOLD
  },
  textDark: {
    alignSelf: 'center',
    fontWeight: '300',
    fontFamily: fonts.BOLD,
    marginBottom: 5,
    color: colors.dark.text
  },
  titleText: {
    borderRadius: 12,
    backgrounColor: colors.light.gray
  },
  itemPress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 12
  },
  itemText: {
    marginLeft: 36,
    fontWeight: '300',
    fontSize: 16,
    color: colors.light.text,
    fontFamily: fonts.BOLD
  },
  itemTextDark: {
    marginLeft: 36,
    fontWeight: '300',
    fontSize: 16,
    fontFamily: fonts.BOLD,
    color: colors.dark.text
  },
  headingText: {
    marginVertical: 10,
    color: colors.light.text,
    fontWeight: '300',
    fontSize: 16,
    fontFamily: fonts.BOLD,
    textAlign: 'left'
  },
  headingTextDark: {
    marginVertical: 10,
    color: colors.dark.text,
    fontWeight: '300',
    fontSize: 16,
    fontFamily: fonts.BOLD
  }
})
export default UserProfileScreen
