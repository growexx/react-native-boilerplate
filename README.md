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
5. Go to ios folder and rename DevRNBoilerplate & StagRNBoilerplate to DevNewName & StagNewName
6. Run `npm install` to install dependencies
7. Run `cd ios` and `pod install`
8. Follow all the instructions listed just after this section in Configuring iOS environment
9. Follow renaming steps given below to rename displayname
10. Start the packager with `npm start`
11. Connect your device or use emulator that's installed in your pc
12. Run the test application:

- Check package.json to run project
- Enjoy!!!

## Configuring iOS environment

1. Open .xcworkspace file in Xcode
2. Click on schemes beside the run button and the click on 'manage schemes'
![image](https://user-images.githubusercontent.com/80036991/110120505-25ca5f80-7de3-11eb-9717-788b4aa26da8.png)
3. Select DevRNBoilerplate and StagRNBoilerplate and delete them by clicking '-' button on left bottom of the popup
![image](https://user-images.githubusercontent.com/80036991/110120747-7772ea00-7de3-11eb-820e-ac913e3f6785.png)
4. Now select DevAppName and click on edit (AppName is your project name)
5. Expand the build section on left and click on build
6. Then click on '+' button on bottom left of the popup and Select 'React' and click on 'Add' button
![image](https://user-images.githubusercontent.com/80036991/110121204-1d265900-7de4-11eb-8cdd-4c4f085c0d1d.png)
7. Now click on Pre-actions from expanded section and click on '+' button and select 'New Run Script Action'
![image](https://user-images.githubusercontent.com/80036991/110121430-62e32180-7de4-11eb-9d14-6e339055b54e.png)
8. Add `echo ".env.development" > /tmp/envfile` in textbox
![image](https://user-images.githubusercontent.com/80036991/110121631-a50c6300-7de4-11eb-95d3-2c483c58242f.png)
9. Repeat step 4 to 8 for StagAppName

## Rename Displayname

### iOS
- Click on each target and rename the displayname and bundle-id
![image](https://user-images.githubusercontent.com/80036991/110122374-8d81aa00-7de5-11eb-846b-e54613bedef2.png)

### Android
- In `android/app/build.gradle`, change the app_name value in product flavors
![image](https://user-images.githubusercontent.com/80036991/110122735-fff28a00-7de5-11eb-9c78-90759bb22c9a.png)


## Notes:

  #### Social Login
  Social logins are implemented for Development environment only.
  So, if you want to implement in Staging and Production env, then add required keys and urls to specific env.
  Reference articles links are provided in bottom 'Resources' section

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
