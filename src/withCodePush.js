import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import CodePush from 'react-native-code-push'
import { configs } from '@constants'

const { CODE_PUSH_KEY_ANDROID, CODE_PUSH_KEY_IOS, ENV } = configs

if (ENV === 'Production') {
  console.log = () => {}
}

const getDeploymentKey = () => {
  if (Platform.OS === 'android') {
    return CODE_PUSH_KEY_ANDROID
  } else if (Platform.OS === 'ios') {
    return CODE_PUSH_KEY_IOS
  }
}

const CODE_PUSH_OPTIONS = {
  deploymentKey: getDeploymentKey(),
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

const withCodePush = App => {
  const WrappedApp = () => {
    useEffect(() => {
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE
        },
        syncWithCodePush
      )
    }, [])

    const syncWithCodePush = status => {
      console.log(status)
    }

    return <App />
  }
  return CodePush(CODE_PUSH_OPTIONS)(WrappedApp)
}

export default withCodePush
