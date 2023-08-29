import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="black" />
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('editProfileScreen')}>
        <Icon name="user" size={24} color="black" />
        <Text style={styles.drawerItemText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('changePassword')}>
        <Icon name="lock" size={24} color="black" />
        <Text style={styles.drawerItemText}>Change Password</Text>
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
