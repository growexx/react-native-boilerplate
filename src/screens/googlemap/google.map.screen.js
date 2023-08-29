import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
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
    // Get current location
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
      }
    )
  }, [])
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
