import React from 'react'
import { View, Image, Text } from 'react-native'
import moment from 'moment'
import styles from './styles'

const NewsCard = props => {
  const timeString = moment(props.item.publishedAt).format('MMM DD, YYYY')
  // const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.item.urlToImage }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text
          numberOfLines={3}
          style={
            props.colorScheme === 'dark'
              ? styles.titleTextDark
              : styles.titleText
          }>
          {props.item.title}
          Hello
        </Text>
        <View style={styles.sourceTimeWrapper}>
          <Text
            style={
              props.colorScheme === 'dark'
                ? styles.sourceTextDark
                : styles.sourceText
            }>
            {props.item.source.name}
          </Text>
          <Text
            style={
              props.colorScheme === 'dark'
                ? styles.timeTextDark
                : styles.timeText
            }>
            {timeString}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default NewsCard
