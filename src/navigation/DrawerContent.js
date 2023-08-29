import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('ChatScreen')}>
        <Text>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('googleMapScreen')}>
        <Text>Google Map</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

export default DrawerContent
