import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

const GoogleMapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Now that permission is granted, retrieve the location
          Geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords
              setRegion(prevRegion => ({
                ...prevRegion,
                latitude,
                longitude
              }))
            },
            error => {
              console.error(error)
              Alert.alert(
                'Location permission denied. Please turn on location permission.'
              )
            }
          )
        }
      } catch (err) {
        console.warn(err)
      }
    }

    // Call the function to request permission
    if (Platform.OS === 'android') {
      requestLocationPermission()
    }
  }, [region.latitude, region.longitude])

  return (
    <View style={styles.container}>
      <MapView
        testID="google-map"
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}></Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
})

export default GoogleMapScreen
