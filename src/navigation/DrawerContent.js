import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LanguageUtils from '../localization/languageUtils'
import languagekeys from '../localization/languagekeys'

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="black" />
        <Text style={styles.drawerItemText}>
          {LanguageUtils.getLangText(languagekeys.dashboard)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('editProfileScreen')}>
        <Icon name="user" size={24} color="black" />
        <Text style={styles.drawerItemText}>
          {' '}
          {LanguageUtils.getLangText(languagekeys.editProfile)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('changePassword')}>
        <Icon name="lock" size={24} color="black" />
        <Text style={styles.drawerItemText}>
          {LanguageUtils.getLangText(languagekeys.changePassword)}
        </Text>
      </TouchableOpacity>
      {/* ...other drawer items */}
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
    paddingHorizontal: 30
  },
  drawerItemText: {
    marginLeft: 10 // Add some space between icon and text
  }
})

export default DrawerContent
