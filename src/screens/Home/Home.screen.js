import React, { useEffect, useState } from 'react'
import {
  Appearance,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
//import Icon from 'react-native-vector-icons/dist/FontAwesome' //NNeed to use alternnate library
import { connect, useDispatch } from 'react-redux'
import { fetchNews, clearRedux } from '@actions/news.action'
import { FETCH_NEWS_SUCCESS } from '@types/news.types'
import { NewsCard } from '@components'
import styles from './styles'
import { logout } from '@actions/auth.action'
import Icon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../constants/colors'

const Home = props => {
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()
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
        <Text
          style={
            colorScheme === 'dark' ? styles.errorTitleDark : styles.errorTitle
          }>
          Oops!
        </Text>
        <Text
          style={
            colorScheme === 'dark'
              ? styles.errorMessageDark
              : styles.errorMessage
          }>
          Something went wrong
        </Text>
        <Text
          style={
            colorScheme === 'dark'
              ? styles.errorMessageDark
              : styles.errorMessage
          }>
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

  const onFilterClick = filter => {
    setPage(1)
    setActiveFilter(filter)
    dispatch(clearRedux())
    dispatch(fetchNews(1, filter))
  }

  const getFilterItemStyle = isActiveFilter => {
    if (isActiveFilter) {
      if (colorScheme === 'dark') {
        return styles.activeViewDark
      } else {
        return styles.activeView
      }
    } else {
      if (colorScheme === 'dark') {
        return styles.inactiveViewDark
      } else {
        return styles.inactiveView
      }
    }
  }

  const getFilterItemTextStyle = isActiveFilter => {
    if (isActiveFilter) {
      if (colorScheme === 'dark') {
        return styles.activeViewTextDark
      } else {
        return styles.activeViewText
      }
    } else {
      if (colorScheme === 'dark') {
        return styles.inactiveViewTextDark
      } else {
        return styles.inactiveViewText
      }
    }
  }

  const renderFilterItem = ({ item, index }) => {
    const isActiveFilter = item === activeFilter
    return (
      <TouchableOpacity
        testID={`FilterButton-${index}`}
        style={getFilterItemStyle(isActiveFilter)}
        onPress={() => onFilterClick(item)}>
        <Text style={getFilterItemTextStyle(isActiveFilter)}>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeAreaView
        style={
          colorScheme === 'dark' ? styles.SafeAreaViewDark : styles.SafeAreaView
        }
        forceInset={{ bottom: 'never' }}>
        <View
          style={colorScheme === 'dark' ? styles.headerDark : styles.header}>
          <TouchableOpacity
            style={
              colorScheme === 'dark' ? styles.headerItemDark : styles.headerItem
            }>
            <Icon
              name="user"
              size={30}
              color={
                colorScheme === 'dark' ? colors.dark.gray : colors.light.gray
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={'themeChange'}
            style={
              colorScheme === 'dark' ? styles.headerItemDark : styles.headerItem
            }
            onPress={() => {}}>
            <MCIcon
              name="theme-light-dark"
              size={30}
              color={
                colorScheme === 'dark' ? colors.dark.gray : colors.light.gray
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={'LogoutButton'}
            style={
              colorScheme === 'dark' ? styles.headerItemDark : styles.headerItem
            }
            onPress={() => dispatch(logout())}>
            <Icon
              name="sign-out"
              size={30}
              color={
                colorScheme === 'dark' ? colors.dark.gray : colors.light.gray
              }
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            style={{
              paddingVertical: 10,
              backgroundColor:
                colorScheme === 'dark'
                  ? colors.dark.background
                  : colors.light.background
            }}
            horizontal={true}
            data={filterList}
            keyExtractor={index => index.toString()}
            renderItem={renderFilterItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor:
              colorScheme === 'dark'
                ? colors.dark.background
                : colors.light.background
          }}>
          <TouchableOpacity
            testID={'change-password-btn'}
            onPress={() => props.navigation.navigate('changePassword')}
            style={styles.changePasswordBtn}>
            <Text style={styles.activeViewTextDark}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            colorScheme === 'dark' ? styles.containerDark : styles.container
          }>
          {props.error ? (
            renderError()
          ) : (
            <FlatList
              testID={'FlatList'}
              data={props.newsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={object => (
                <NewsCard item={object.item} colorScheme={colorScheme} />
              )}
              showsVerticalScrollIndicator={false}
              onEndReached={() => dispatch(fetchNews(page, activeFilter))}
              onEndReachedThreshold={0.7}
              refreshing={props.isLoading}
              initialNumToRender={15}
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
