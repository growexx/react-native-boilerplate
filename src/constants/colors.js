const white = '#fff'
const black = '#000'
const dark = '#626262'
const light = '#dbdbdb'
const blue = '#1F41BB'
const gray = '#ECECEC'
const darkGray = '#4d4d4d'
const lightBlue = '#f1f4ff'

export default {
  light: {
    darkText: dark,
    text: black,
    background: white,
    primary: blue,
    onPrimary: white,
    active: blue,
    borderWithOpacity: '#1f41bb',
    lightPrimary: lightBlue,
    gray
  },
  dark: {
    darkText: light,
    text: white,
    background: black,
    primary: blue,
    onPrimary: black,
    active: lightBlue,
    borderWithOpacity: '#828eb8',
    lightPrimary: lightBlue,
    gray: darkGray
  }
}
