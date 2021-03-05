# react-native-boilerplate

## What is React Native Boilerplate
 It is a template that you can clone and reuse for every project. It is starting point for React Native application.

## React Native Boilerplate

consist of:

- react-native": "0.63.4"
- react-navigation and its dependencies
- redux, redux persist redux thunk and redux logger
- react native vector icons
- react-native async storage
- react-native-config
- react-native-axios
- react-native-splash-screen
- react-native-code-push

## Getting Started

1. Clone this repo
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Use React Native Rename to update project name `$ npx react-native-rename <newName>`
5. Run `npm install` to install dependencies
6. Run `npx pod-install` from root of your project
7. Start the packager with `npm start`
8. Connect your device or use emulator that's installed in your pc
9. Run the test application:

- Check package.json to run project

10. Enjoy!!!

## Notes:

  #### Handling console logs
  In src/withcodePush.js line 8-11, logs are disabled for Production
  `if (ENV === 'Production') {
    console.log = () => {}
  }`

  #### Handling redux logs
  In src/stores/index.js line 12-15, logs are disabled for Production
  `if (configs.ENV !== 'Production') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }`

## List of Q & A:

  #### I got error `Error: spawn ./gradlew EACCES` when run `npx react-native run-android`.
  Run this command `chmod 755 android/gradlew` from your root project directory

  #### I got error `Error: SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.`
  - Go to your Project -> Android
  - Create a file local.properties
  - Open the file
  - Paste your Android SDK path depending on the operating system:

    - Windows:
      sdk.dir=C:/Users/`USERNAME`/AppData/Local/Android/sdk
    - Linux or MacOS
      sdk.dir=/home/`USERNAME`/Android/sdk

  - Replace `USERNAME` with your PC username

## Resources:

  ### Setting up react-native environments
  - https://medium.com/swlh/setting-up-multiple-environments-on-react-native-for-ios-and-android-c43f3128754f

  ### Adding Splash screen
  - https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9

  ### Login with facebook
  - https://medium.com/@mehrankhandev/integrating-fbsdk-facebook-login-in-react-native-7b7600ce74a7

  ### Login with Google
  - https://github.com/react-native-google-signin/google-signin

  ### React native code push (Hot update)
  - https://www.npmjs.com/package/react-native-code-push
