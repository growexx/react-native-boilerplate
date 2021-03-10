import React from 'react'
import { View, Image, Text } from 'react-native'
import moment from 'moment'
import styles from './styles'

const NewsCard = ({ item }) => {
  const timeString = moment(item.publishedAt).format('MMM DD, YYYY')

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.titleText}>
          {item.title}
        </Text>
        <View style={styles.sourceTimeWrapper}>
          <Text style={styles.sourceText}>{item.source.name}</Text>
          <Text style={styles.timeText}>{timeString}</Text>
        </View>
      </View>
    </View>
  )
}

export default NewsCard
