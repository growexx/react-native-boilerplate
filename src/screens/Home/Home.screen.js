import React, { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { connect, useDispatch } from 'react-redux'
import { fetchNews, clearRedux } from '@actions/news.action'
import { FETCH_NEWS_SUCCESS } from '@types/news.types'
import { NewsCard } from '@components'
import styles from './styles'
import { colors } from '@constants'
import { logout } from '@actions/auth.action'

const Home = props => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const filterList = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ]
  const [activeFilter, setActiveFilter] = useState('general')

  useEffect(() => {
    clearRedux()
    dispatch(fetchNews(page, activeFilter))
  }, [])

  useEffect(() => {
    if (props.newsState.type === FETCH_NEWS_SUCCESS) {
      setPage(page + 1)
    }
  }, [props.newsState])

  const onRefreshList = () => {
    setPage(1)
    dispatch(clearRedux())
    dispatch(fetchNews(1, activeFilter))
  }

  const renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>Something went wrong</Text>
        <Text style={styles.errorMessage}>
          Please check your internet connection
        </Text>
        <TouchableOpacity
          testID={'RetryButton'}
          style={styles.retryButton}
          onPress={() => dispatch(fetchNews(page, activeFilter))}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onFilterClick = (filter) => {
    setPage(1)
    setActiveFilter(filter)
    dispatch(clearRedux())
    dispatch(fetchNews(1, filter))
  }

  const renderFilterItem = ({ item, index }) => {
    const isActiveFilter = item === activeFilter
    return (
      <TouchableOpacity
        testID={`FilterButton-${index}`}
        style={isActiveFilter ? styles.activeView : styles.inactiveView}
        onPress={() => onFilterClick(item)}>
        <Text
          style={
            isActiveFilter ? styles.activeViewText : styles.inactiveViewText
          }>
          {item}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeAreaView
        style={styles.SafeAreaView}
        forceInset={{ bottom: 'never' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerItem} onPress={() => {}}>
            <Icon name="user" size={30} color={colors.DARK_GREY} />
          </TouchableOpacity>
          <TouchableOpacity testID={'LogoutButton'} style={styles.headerItem} onPress={() => dispatch(logout())}>
            <Icon name="sign-out" size={30} color={colors.DARK_GREY} />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={true}
            data={filterList}
            keyExtractor={index => index.toString()}
            renderItem={renderFilterItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.container}>
          {props.error ? (
            renderError()
          ) : (
            <FlatList
              testID={'FlatList'}
              data={props.newsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={NewsCard}
              showsVerticalScrollIndicator={false}
              onEndReached={() => dispatch(fetchNews(page, activeFilter))}
              onEndReachedThreshold={0.7}
              refreshing={props.isLoading}
              onRefresh={() => onRefreshList()}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    deviceInfo: state.deviceInfoReducer,
    newsState: state.newsReducer,
    newsList: state.newsReducer.newsList,
    isLoading: state.newsReducer.isLoading,
    error: state.newsReducer.error
  }
}

export default connect(mapStateToProps, null)(Home)
