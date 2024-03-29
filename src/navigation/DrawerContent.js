import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LanguageUtils from '../localization/languageUtils'
import languagekeys from '../localization/languagekeys'

const DrawerContent = ({ navigation }) => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate(' ')}>
        <Icon
          name="home"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.dashboard)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('editprofilescreen')}>
        <Icon
          name="user"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {' '}
          {LanguageUtils.getLangText(languagekeys.editProfile)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('changePassword')}>
        <Icon
          name="lock"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.changePassword)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('PinCodeScreen')}>
        <Icon
          name="shield"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.pin)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('googleMapScreen')}>
        <Icon
          name="map-marker"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.googleMap)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Todo')}>
        <Icon
          name="list-ul"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.todo)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('userProfile')}>
        <Icon
          name="user"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <Text
          style={
            colorScheme === 'dark'
              ? styles.drawerItemTextDark
              : styles.drawerItemText
          }>
          {LanguageUtils.getLangText(languagekeys.userProfile)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200
  },
  drawerItem: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center align icon and text vertically
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  drawerItemText: {
    marginLeft: 10 // Add some space between icon and text
  },
  drawerItemTextDark: {
    marginLeft: 10,
    color: 'white'
  }
})

export default DrawerContent
