import React, { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { fetchNews, clearRedux } from '@actions/news.action'
import { FETCH_NEWS_SUCCESS } from '@types/news.types'
import { NewsCard } from '@components'
import styles from './styles'
import { logout } from '@actions/auth.action'
import Icon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../constants/colors'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'
import EventEmitter from 'events'

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
  const [texts, setTexts] = useState({
    general: LanguageUtils.getLangText(languagekeys.general),
    business: LanguageUtils.getLangText(languagekeys.business),
    entertainment: LanguageUtils.getLangText(languagekeys.entertainment),
    health: LanguageUtils.getLangText(languagekeys.health),
    science: LanguageUtils.getLangText(languagekeys.science),
    sports: LanguageUtils.getLangText(languagekeys.sports),
    technology: LanguageUtils.getLangText(languagekeys.technology),
    errorMessage: LanguageUtils.getLangText(languagekeys.errorMessage),
    errorHeader: LanguageUtils.getLangText(languagekeys.errorHeader),
    retry: LanguageUtils.getLangText(languagekeys.retry),
    changePassword: LanguageUtils.getLangText(languagekeys.changePassword),
    editProfile: LanguageUtils.getLangText(languagekeys.editProfile),
  })
  var emitter = new EventEmitter()

  useEffect(() => {
    clearRedux()
    dispatch(fetchNews(page, activeFilter))
  }, [])

  const updateText = () => {
    setTexts({
      general: LanguageUtils.getLangText(languagekeys.general),
      business: LanguageUtils.getLangText(languagekeys.business),
      entertainment: LanguageUtils.getLangText(languagekeys.entertainment),
      health: LanguageUtils.getLangText(languagekeys.health),
      science: LanguageUtils.getLangText(languagekeys.science),
      sports: LanguageUtils.getLangText(languagekeys.sports),
      technology: LanguageUtils.getLangText(languagekeys.technology),
      errorMessage: LanguageUtils.getLangText(languagekeys.errorMessage),
      errorHeader: LanguageUtils.getLangText(languagekeys.errorHeader),
      retry: LanguageUtils.getLangText(languagekeys.retry),
      changePassword: LanguageUtils.getLangText(languagekeys.changePassword),
      editProfile: LanguageUtils.getLangText(languagekeys.editProfile)
    })
  }

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
          {texts.errorHeader}
        </Text>
        <Text
          style={
            colorScheme === 'dark'
              ? styles.errorMessageDark
              : styles.errorMessage
          }>
          {texts.errorMessage}
        </Text>
        <TouchableOpacity
          testID={'RetryButton'}
          style={styles.retryButton}
          onPress={() => dispatch(fetchNews(page, activeFilter))}>
          <Text style={styles.retryText}>{texts.retry}</Text>
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
        <Text style={getFilterItemTextStyle(isActiveFilter)}>
          {texts[item]}
        </Text>
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
            testID={'languageChange'}
            style={
              colorScheme === 'dark' ? styles.headerItemDark : styles.headerItem
            }
            onPress={async () => {
              await LanguageUtils.switchAppLanguage()
              updateText()
            }}>
            <Icon
              name="language"
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
            // eslint-disable-next-line react-native/no-inline-styles
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
            <Text style={styles.activeViewTextDark}>
              {texts.changePassword}
            </Text>
          </TouchableOpacity>
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
            testID={'edit-profile-btn'}
            onPress={() => props.navigation.navigate('editProfileScreen')}
            style={styles.changePasswordBtn}>
            <Text style={styles.activeViewTextDark}>{texts.editProfile}</Text>
          </TouchableOpacity>
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
            testID={'edit-profile-btn'}
            onPress={() => props.navigation.navigate('paymentScreen')}
            style={styles.changePasswordBtn}>
            <Text style={styles.activeViewTextDark}>Payment</Text>
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
