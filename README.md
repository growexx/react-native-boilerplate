## Getting Started

The Boilerplate contains the minimal implementation required to create a new library or project. The repository code is preloaded with some basic components like basic app architecture, app theme, constants and required dependencies to create a new project. By using boiler plate code as standard initializer, we can have same patterns in all the projects that will inherit it. This will also help in reducing setup & development time by allowing you to use same code pattern and avoid re-writing from scratch.

## Setup Reactnative in system

We are going with CLI option.
Go to this official document for setup 
https://reactnative.dev/docs/environment-setup?guide=native

## How to Use

Download or clone this repo by using the link below:

```
https://github.com/growexx/react-native-boilerplate
```

1. Clone this repo
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Use React Native Rename to update project name `$ npx react-native-rename <newName>`
5. Go to ios folder and rename DevRNBoilerplate & StagRNBoilerplate to DevNewName & StagNewName
6. Run `npm install` to install dependencies
7. Run `cd ios` and `pod install`
8. Follow all the instructions listed just after this section in Configuring iOS environment
9. Follow renaming steps given below to rename displayname & version
10. Start the packager with `npm start`
11. Connect your device or use emulator that's installed in your pc
12. Run the test application:

- Check package.json to run project
- Enjoy!!!


## Features

#### 1. Basic architechture
    Components, containers, store, services, utils
#### 2. Predictable state management
    Redux, Redux Thunk & Redux Persist
#### 3. API integration
    Axios integration to make api calls
#### 4. Next generation JavaScript
    Template strings, Object destructuring, Arrow functions, JSX syntax and more
#### 5. react-native-localize internationalization
    Scalable apps need to support multiple languages with `react-native-localize`
#### 6. Configured environments
    Development, Staging, Production
#### 7. Social Login
    Login with Facebook, Instagram, Google & Apple(iOS only)


## Packages
| Package | Description |
| --------------------- | ------------------------------------------------ |
| @invertase/react-native-apple-authentication | Apple authentication |
| @react-native-async-storage/async-storage | Localstorage |
| @react-native-community/google-signin | Google Authentication |
| @react-native-community/netinfo | Internet connectivity listener |
| @react-navigation/bottom-tabs | Bottom tab navigator |
| @react-navigation/material-top-tabs | Top tab navigator |
| @react-navigation/native | To compose navigators |
| @react-navigation/stack | Stack navigator |
| axios | Api client |
| moment | Format dates |
| react | React |
| react-native | React Native |
| react-native-code-push | To push hot(silent) updates |
| react-native-config | Manages standard environments |
| react-native-device-info | To get device information |
| react-native-fbsdk | Facebook authentication |
| react-native-gesture-handler | Handle gestures |
| react-native-i18n | Support multiple languages |
| react-native-reanimated | Creates animations |
| react-native-safe-area-context | SafeAreaView for iPhones |
| react-native-splash-screen | Configures splash screen |
| react-native-vector-icons | Icons |
| react-redux | Manages shared state |
| redux | Manages shared state |
| redux-logger | Logs after state update |
| redux-persist | Saves current state to local storage |
| redux-thunk | To manage asynchronous tasks |

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

## Configuring react-native-localize

1. At first we have to make some files for localization in the project->src->localization folder.
2. The First file we have to create is languagekeys.js because, in that, we will add all keys in the string to maintain a multi-language feature.
3. Now we will create en.js because, in that, we will add all text containing the English language translation. So paste the content below into it.
4. Now, we will create arabic.js because we will add all text containing the translation for the Arabic language. So paste the content below into it.
5. Now we will create hin.js because, in that, we will add all text which contains the translation for the Hindi language. So paste the content below into it.
6. Now, we must create a simple class for managing functionality for multi-language support. So we will make a LanguageUtils.js file. 
7. We will define the class as a file name and have to define obj, which contains how many languages we need to add to the application.
8. Next, we need to add an array of locales that we need in the app.
9.  Now we will add one constant, which gives us the current language, and if not set, then by using one method, we have to set it. So we will use the react-native-localize lib’s one method and pass all locales, giving the best suitable language localization value from a mobile device; then, we can set language to local async storage.
10. Now we have added one method, which we call once when our app is mounted. So basically, it does one thing, if the user already chooses the language, it will set it for the whole app; otherwise, it will store language from device suitable locales.
11.  Now we have added one method which returns the localization value for a particular selected language and will display it on screens. By default, it returns the English language localization value.
12. Now whenever we want to display text, we need to use LanguageUtils.getLangText() method in that we need to pass languagekeys’s key value.

## Rename Displayname & Version

### iOS
- Click on each target and rename the displayname and bundle-id
- Change version & build inputs based on updates in Xcode.
  
- Version Numbering:

Version Number (CFBundleShortVersionString): This is the user-visible version number that appears on the App Store and to your users. It should follow SemVer and be incremented when you release significant updates with new features or major changes.

Build Number (CFBundleVersion): This number is used internally and doesn't necessarily follow SemVer. Increment the build number for each new build you create, regardless of whether it's a minor bug fix or a major feature release. Use a scheme that suits your development workflow, such as using a timestamp or a sequential number.
![image](https://user-images.githubusercontent.com/80036991/110122374-8d81aa00-7de5-11eb-846b-e54613bedef2.png)

### Android
- In `android/app/build.gradle`, change the app_name value in product flavors
![image](https://user-images.githubusercontent.com/80036991/110122735-fff28a00-7de5-11eb-9c78-90759bb22c9a.png)

- Versioning:
  
  Update build.gradle (Module: app): In your app module's build.gradle file, you'll find version information that you can update. Here's an example:

   <img width="680" alt="Screenshot 2023-09-10 at 10 42 15 PM" src="https://github.com/growexx/react-native-boilerplate/assets/96043711/51365aba-c9d0-4ea8-bd35-b7b37c39a51d">

- versionCode: This is an integer that represents the version of your APK. It must be incremented for each new version. It's used by Android to determine whether one version is more recent than another.
- versionName: This is a string that represents the user-visible version number of your app. You can use a string like "1.1" to indicate the version to users.


## Notes:

  #### Social Login
  Social logins are implemented for Development environment only.
  So, if you want to implement in Staging and Production env, then add required keys and urls to specific env.
  Reference article links are provided in bottom 'Resources' section

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

| Name | Description |
| --------------------- | ------------------------------------------------ |
| BoilerPlate basic code | https://github.com/handi-dev/react-native-boilerplate |
| Setting up react-native environments | https://medium.com/swlh/setting-up-multiple-environments-on-react-native-for-ios-and-android-c43f3128754f |
| Adding Splash screen | https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9 |
| Login with facebook | https://medium.com/@mehrankhandev/integrating-fbsdk-facebook-login-in-react-native-7b7600ce74a7 |
| Login with Google | https://github.com/react-native-google-signin/google-signin |
